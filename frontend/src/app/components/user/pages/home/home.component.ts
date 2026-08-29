import {Component,ElementRef, NgZone, Renderer2, ViewChild} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import AOS from 'aos';
import * as L from 'leaflet';

import { SharedService } from '../../../../services/services/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlantDiseaseControllerService } from '../../../../services/services';
import Swal from 'sweetalert2';

declare const PureCounter: any;


// ============================================================
// Interfaces
// ============================================================

interface Crop {
  id: number;
  name: string;
  value: string;
}


// ============================================================
// Component
// ============================================================

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  // ==========================================================
  // File / Image
  // ==========================================================

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;

  imagePreview: string | null = null;


  // ==========================================================
  // Crop
  // ==========================================================

  selectedCrop: string = '';

  crops: Crop[] = [
    { id: 1, name: 'Tomato', value: 'tomato'},
    { id: 2, name: 'Potato', value: 'potato'},
    {  id: 3,  name: 'Corn',  value: 'corn'},
    {  id: 4,  name: 'Wheat',  value: 'wheat'},
    {  id: 5,  name: 'Rice',  value: 'rice'},
    {  id: 6,  name: 'Apple',  value: 'apple'},
    {  id: 7,  name: 'Grape',  value: 'grape'},
    {  id: 8,  name: 'Citrus',  value: 'citrus'}
  ];


  // ==========================================================
  // Location
  // ==========================================================

  map: L.Map | null = null;

  marker: L.Marker | null = null;

  selectedAddress: string = '';

  selectedLat: number | null = null;

  selectedLng: number | null = null;

  showLocationModal: boolean = false;

  private mapInitialized: boolean = false;


  // ==========================================================
  // Detection State
  // ==========================================================

  isAnalyzing: boolean = false;

  detectionError: string = '';

  // ============================================================
  // Detection Result
  // ============================================================
  detectionResult: any = null;
  detectionResultImage: string | null = null;


  // ==========================================================
  // Leaflet Marker Icon
  // ==========================================================

  private customIcon = L.icon({

    iconUrl:
      'https://cdn-icons-png.flaticon.com/512/684/684908.png',

    iconSize: [38, 38],

    iconAnchor: [19, 38],

    popupAnchor: [0, -38],

    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    shadowSize: [41, 41]
  });


  // ==========================================================
  // Constructor
  // ==========================================================

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public sharedService: SharedService,
    private zone: NgZone,
    private spinner:NgxSpinnerService,
    private detectionService: PlantDiseaseControllerService
    
  ) {}


  // ==========================================================
  // Lifecycle
  // ==========================================================

  ngOnInit(): void {

    this.activeFaqItem();
  }


  ngAfterViewInit(): void {

    AOS.init({
      once: true,
      duration: 800,
      offset: 100,
      easing: 'ease-in-out'
    });

    new PureCounter();
  }


  ngOnDestroy(): void {

    this.destroyMap();

    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
  }


  // ==========================================================
  // IMAGE SELECTION
  // ==========================================================

  openCamera(): void {

    this.fileInput.nativeElement.click();
  }


  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];


    // --------------------------------------------------------
    // Validate image
    // --------------------------------------------------------

    if (!file.type.startsWith('image/')) {

      this.detectionError =
        'Please select a valid image file.';

      return;
    }


    // --------------------------------------------------------
    // Validate file size
    // --------------------------------------------------------

    const maxSize =
      10 * 1024 * 1024; // 10 MB

    if (file.size > maxSize) {

      this.detectionError =
        'Image size must be less than 10 MB.';

      return;
    }


    // --------------------------------------------------------
    // Save selected file
    // --------------------------------------------------------

    this.selectedFile = file;

    this.detectionError = '';

    console.log(
      'Image selected:',
      file
    );


    // --------------------------------------------------------
    // Generate preview
    // --------------------------------------------------------

    this.createImagePreview(file);


    // --------------------------------------------------------
    // Reset previous detection data
    // --------------------------------------------------------

    this.selectedCrop = '';

    this.selectedAddress = '';

    this.selectedLat = null;

    this.selectedLng = null;


    // --------------------------------------------------------
    // Open detection modal
    // --------------------------------------------------------

    setTimeout(() => {

      this.sharedService.openModal('detectionModal');

    }, 100);
  }


  private createImagePreview(file: File): void {

    // Remove previous preview
    if (this.imagePreview) {

      URL.revokeObjectURL(
        this.imagePreview
      );
    }


    // Create new preview
    this.imagePreview =
      URL.createObjectURL(file);
  }


  // ==========================================================
  // FILE INFORMATION
  // ==========================================================

  getFileSize(): string {

    if (!this.selectedFile) {
      return '';
    }

    const size =
      this.selectedFile.size;


    if (size < 1024 * 1024) {

      return (
        size / 1024
      ).toFixed(1) + ' KB';
    }


    return (
      size / (1024 * 1024)
    ).toFixed(1) + ' MB';
  }


  // ==========================================================
  // LOCATION
  // ==========================================================

  get selectedCoordinates(): string {

    if (
      this.selectedLat === null ||
      this.selectedLng === null
    ) {

      return '';
    }

    return `${this.selectedLat.toFixed(6)}, ${this.selectedLng.toFixed(6)}`;
  }


  openLocationModal(): void {



    // Wait until modal/map container exists
    setTimeout(() => {

      this.initializeMap();

    }, 150);
  }


  closeLocationModal(): void {

    this.showLocationModal = false;

    this.destroyMap();
  }


  // ==========================================================
  // INITIALIZE MAP
  // ==========================================================

  initializeMap(): void {

    if (this.mapInitialized) {
      return;
    }


    const mapContainer =
      document.getElementById(
        'detectionFarmLocationMap'
      );


    if (!mapContainer) {
      return;
    }


    // --------------------------------------------------------
    // Default location
    // --------------------------------------------------------

    const defaultLat = 35.0377;
    const defaultLng = 9.4862;


    // --------------------------------------------------------
    // Create map
    // --------------------------------------------------------

    this.map =
      L.map(
        'detectionFarmLocationMap'
      ).setView(
        [
          defaultLat,
          defaultLng
        ],
        8
      );


    // --------------------------------------------------------
    // OpenStreetMap tiles
    // --------------------------------------------------------

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '© OpenStreetMap contributors',

        maxZoom: 19
      }
    ).addTo(this.map);


    // --------------------------------------------------------
    // Map click
    // --------------------------------------------------------

    this.map.on(
      'click',
      (event: L.LeafletMouseEvent) => {

        this.zone.run(() => {

          this.placeMarker(
            event.latlng
          );

        });
      }
    );


    // --------------------------------------------------------
    // Try user's current location
    // --------------------------------------------------------

    this.getCurrentLocation();


    this.mapInitialized = true;


    // --------------------------------------------------------
    // Fix Leaflet rendering
    // --------------------------------------------------------

    setTimeout(() => {

      this.map?.invalidateSize();

    }, 200);
  }


  // ==========================================================
  // CURRENT LOCATION
  // ==========================================================

  getCurrentLocation(): void {

    if (!navigator.geolocation) {

      console.warn(
        'Geolocation is not supported.'
      );

      return;
    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;


        this.zone.run(() => {

          if (!this.map) {
            return;
          }


          this.map.setView(
            [lat, lng],
            13
          );


          this.placeMarker(
            L.latLng(lat, lng)
          );
        });
      },


      (error) => {

        console.warn(
          'Could not get current location:',
          error
        );
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 300000
      }
    );
  }


  // ==========================================================
  // PLACE MARKER
  // ==========================================================

  async placeMarker(
    latlng: L.LatLngExpression
  ): Promise<void> {

    const coordinates =
      L.latLng(latlng);


    this.selectedLat =
      coordinates.lat;

    this.selectedLng =
      coordinates.lng;


    // --------------------------------------------------------
    // Get address
    // --------------------------------------------------------

    this.selectedAddress =
      'Loading address...';


    const address =
      await this.getAddressFromCoordinates(
        coordinates.lat,
        coordinates.lng
      );


    this.zone.run(() => {

      this.selectedAddress =
        address;
    });


    // --------------------------------------------------------
    // Remove previous marker
    // --------------------------------------------------------

    if (this.marker) {

      this.map?.removeLayer(
        this.marker
      );
    }


    // --------------------------------------------------------
    // Create marker
    // --------------------------------------------------------

    this.marker =
      L.marker(
        coordinates,
        {
          icon: this.customIcon
        }
      ).addTo(this.map!);


    // --------------------------------------------------------
    // Popup
    // --------------------------------------------------------

    this.marker
      .bindPopup(
        `
        <b>Detection Location</b><br>
        ${address}<br>
        ${coordinates.lat.toFixed(4)},
        ${coordinates.lng.toFixed(4)}
        `
      )
      .openPopup();
  }


  // ==========================================================
  // REVERSE GEOCODING
  // ==========================================================

  private async getAddressFromCoordinates(
    lat: number,
    lng: number
  ): Promise<string> {

    try {

      const response =
        await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en'
            }
          }
        );


      if (!response.ok) {

        throw new Error(
          'Address lookup failed'
        );
      }


      const data = await response.json();
      const address = data.address;
      if (!address) {

        return (
          data.display_name || 'Address not found'
        );
      }

      const parts: string[] = [];

      if (address.road) {
        parts.push(
          address.road
        );
      }

      if (address.suburb) {
        parts.push(
          address.suburb
        );
      }

      if (address.city) {
        parts.push(
          address.city
        );
      }

      if (address.town) {
        parts.push(
          address.town
        );
      }

      if (address.village) {
        parts.push(
          address.village
        );
      }

      if (address.country) {
        parts.push(
          address.country
        );
      }


      return (
        parts.join(', ') ||
        data.display_name ||
        'Address not found'
      );

    } catch (error) {

      console.error(
        'Reverse geocoding error:',
        error
      );

      return 'Address lookup failed';
    }
  }


  // ==========================================================
  // CONFIRM LOCATION
  // ==========================================================

  confirmLocation(): void {

    if (
      this.selectedLat === null ||
      this.selectedLng === null
    ) {

      return;
    }


  }


  // ==========================================================
  // DESTROY MAP
  // ==========================================================

  private destroyMap(): void {

    if (this.map) {

      this.map.remove();

      this.map = null;
    }

    this.marker = null;

    this.mapInitialized = false;
  }


  // ==========================================================
  // ANALYZE
  // ==========================================================

  onAnalyze(): void {

  // ============================================================
  // Validate image
  // ============================================================

  if (!this.selectedFile) {

    this.detectionError = 'Please select an image.';

    return;
  }


  // ============================================================
  // Validate crop
  // ============================================================

  if (!this.selectedCrop) {

    this.detectionError = 'Please select the crop.';

    return;
  }


  // ============================================================
  // Validate location
  // ============================================================

  if (
    this.selectedLat === null ||
    this.selectedLng === null
  ) {

    this.detectionError =
      'Please select the detection location.';

    return;
  }


  // ============================================================
  // Start loading
  // ============================================================

  this.detectionError = '';
  this.isAnalyzing = true;
  this.spinner.show();


  // ============================================================
  // Detection metadata
  // ============================================================

  const detectionData = {

    cropType: this.selectedCrop,

    location: {

      address: this.selectedAddress,

      lat: this.selectedLat,

      lng: this.selectedLng

    }

  };


  // ============================================================
  // Image
  // ============================================================

  const image = new FormData();

  image.append(
    'image',
    this.selectedFile
  );


  // ============================================================
  // Send Detection
  // ============================================================

  this.detectionService.detectDisease({

    data: JSON.stringify(detectionData),

    body: {
      image: image as any
    }

  }).subscribe({

    next: (response) => {

      console.log(
        'Detection response:',
        response
      );


      // Stop loading
      this.spinner.hide();
      this.isAnalyzing = false;


      // Save result
      this.detectionResult = response;


      // Keep uploaded image
      this.detectionResultImage = this.imagePreview;
      Swal.fire(
         "Good job!", 
         "Detection successful", 
         "success"
        ) .then(() => {
           this.sharedService.openModal("detectionResultModal");
       });

    },


    error: (error) => {

      this.spinner.hide();
      this.isAnalyzing = false;

      console.error(
        'Disease detection failed:',
        error
      );

      this.sharedService.handleError(error);

    }

  });

}


  // ==========================================================
  // CANCEL DETECTION
  // ==========================================================

  onCancel(): void {

    this.resetDetection();

    this.hideDetectionModal();
  }


  private resetDetection(): void {

    this.selectedFile = null;

    this.selectedCrop = '';

    this.selectedAddress = '';

    this.selectedLat = null;

    this.selectedLng = null;

    this.detectionError = '';

    this.isAnalyzing = false;


    if (this.imagePreview) {

      URL.revokeObjectURL(
        this.imagePreview
      );

      this.imagePreview = null;
    }


    if (this.fileInput) {

      this.fileInput.nativeElement.value =
        '';
    }
  }


  private hideDetectionModal(): void {

    const modalElement =
      document.getElementById(
        'detectionModal'
      );


    if (!modalElement) {
      return;
    }


    const bootstrap =
      (window as any).bootstrap;


    if (bootstrap) {

      const modal =
        bootstrap.Modal.getInstance(
          modalElement
        );


      if (modal) {

        modal.hide();
      }
    }
  }


  // ==========================================================
  // FAQ
  // ==========================================================

  activeFaqItem(): void {

    const faqItems =
      this.el.nativeElement.querySelectorAll(
        '.faq-item'
      );


    faqItems.forEach(
      (faqItem: HTMLElement) => {

        this.renderer.listen(
          faqItem,
          'click',
          () => {

            faqItems.forEach(
              (item: HTMLElement) => {

                this.renderer.removeClass(
                  item,
                  'faq-active'
                );
              }
            );


            this.renderer.addClass(
              faqItem,
              'faq-active'
            );


            const content =
              faqItem.querySelector(
                '.faq-content'
              ) as HTMLElement;


            if (content) {

              const isActive =
                faqItem.classList.contains(
                  'faq-active'
                );


              this.renderer.setStyle(
                content,
                'display',
                isActive
                  ? 'block'
                  : 'none'
              );
            }
          }
        );
      }
    );
  }
}