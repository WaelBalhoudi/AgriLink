import { Component, AfterViewInit, OnDestroy, viewChild, Renderer2, NgZone, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import * as L from 'leaflet';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../../../services/services';
import { SharedService } from '../../../../services/services/shared/shared.service';
import { AuthenticationRequest, RegistrationRequest, VerificationRequest } from '../../../../services/models';
import { CommonModule } from '@angular/common';

interface FarmTag {
  id: number;
  value: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CodeInputModule,CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  readonly codeInput1 = viewChild.required<CodeInputComponent>('codeInput1');
  readonly codeInput2 = viewChild.required<CodeInputComponent>('codeInput1');
  farmTags: FarmTag[] = [];
  tagInputValue: string = '';
  showPassword: boolean = false;
  private tagIdCounter: number = 0;

  formData = {
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    experience: '',
    location: ''
  };

  // Map related properties
  map: L.Map | null = null;
  marker: L.Marker | null = null;
  selectedCoordinates: string = '';
  selectedAddress: string = ''; // ✅ NEW: Store address
  selectedLat: number | null = null;
  selectedLng: number | null = null;
  private mapInitialized: boolean = false;

  


  userEmail="";
  isUserLoggedIn=false;
  isAdmin=false;
  tokenInfo:any;
  
 

  constructor(
    private renderer: Renderer2,
    private authServer:AuthenticationService,
    private spinner:NgxSpinnerService,
    private sharedService:SharedService,
    private zone: NgZone,
    private router:Router,
    private el: ElementRef,

  
  ) {}

  ngOnInit(){
    this.verifyToken();
    this.toggleActiveClass()
  }
    toggleActiveClass() {
    const navLinks = this.el.nativeElement.querySelectorAll('.navmenu a');

    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => {
        // Remove 'active' from all links
        navLinks.forEach((l: HTMLElement) => this.renderer.removeClass(l, 'active'));

        // Add 'active' to the clicked link
        this.renderer.addClass(link, 'active');
      });
    });
  }

  // ✅ Custom marker icon from CDN
  private customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Red location pin
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  predefinedFarmTypes = [
    'Olives', 'Vegetables', 'Fruits', 'Livestock', 'Mixed Farming'
  ];

  ngAfterViewInit(): void {
    const mapModal = document.getElementById('locationMapModal');
    if (mapModal) {
      mapModal.addEventListener('shown.bs.modal', () => {
        this.initializeMap();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.mapInitialized = false;
    }
  }

  // ✅ Initialize Leaflet Map
  initializeMap(): void {
    if (this.mapInitialized) return;
    
    const mapContainer = document.getElementById('farmLocationMap');
    if (!mapContainer) {
      console.warn('Map container not found');
      return;
    }

    const defaultLat = 35.0377;
    const defaultLng = 9.4862;

    this.map = L.map('farmLocationMap').setView([defaultLat, defaultLng], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.placeMarker(e.latlng);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLatLng = L.latLng(userLat, userLng);
          
          this.map?.setView([userLat, userLng], 13);
          this.placeMarker(userLatLng);
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }

    this.mapInitialized = true;
    
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  // ✅ Get address from coordinates (Reverse Geocoding)
  private async getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    try {
      // Using Nominatim (OpenStreetMap's free geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en' // Change to 'ar' for Arabic
          }
        }
      );
      
      const data = await response.json();
      
      // Extract address components
      const address = data.address;
      let formattedAddress = '';
      
      if (address) {
        const parts = [];
        if (address.road) parts.push(address.road);
        if (address.suburb) parts.push(address.suburb);
        if (address.city) parts.push(address.city);
        if (address.town) parts.push(address.town);
        if (address.village) parts.push(address.village);
        if (address.country) parts.push(address.country);
        
        formattedAddress = parts.join(', ');
      }
      
      return formattedAddress || data.display_name || 'Address not found';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address lookup failed';
    }
  }

  // ✅ Place marker on map with custom icon and address
  async placeMarker(latlng: L.LatLngExpression) {
    const latLng = L.latLng(latlng);
    
    this.selectedLat = latLng.lat;
    this.selectedLng = latLng.lng;
    this.selectedCoordinates = `${latLng.lat.toFixed(4)}, ${latLng.lng.toFixed(4)}`;

    // ✅ Get address from coordinates
    const address = await this.getAddressFromCoordinates(latLng.lat, latLng.lng);
    this.selectedAddress = address;

    // Update display text
    const locationText = document.getElementById('selectedLocationText');
    const coordinatesText = document.getElementById('selectedCoordinatesText');
    
    if (locationText) {
      locationText.textContent = address;
    }
    if (coordinatesText) {
      coordinatesText.textContent = `Lat: ${latLng.lat.toFixed(4)}, Lng: ${latLng.lng.toFixed(4)}`;
    }

    // Remove existing marker
    if (this.marker) {
      this.map?.removeLayer(this.marker);
    }

    // ✅ Add marker with custom icon
    this.marker = L.marker(latLng, { icon: this.customIcon }).addTo(this.map!);
    this.marker.bindPopup(`<b>Selected Location</b><br>${address}<br>${this.selectedCoordinates}`).openPopup();
  }

  confirmLocation(): void {
    if (this.selectedLat && this.selectedLng) {
      // ✅ Save both address and coordinates
      this.formData.location = `${this.selectedAddress} (${this.selectedCoordinates})`;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getPasswordType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  getPasswordIcon(): string {
    return this.showPassword ? 'fa-eye-slash' : 'fa-eye';
  }

  addTag(value: string): void {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    const exists = this.farmTags.some(tag => tag.value.toLowerCase() === trimmedValue.toLowerCase());
    if (exists) {
      this.tagInputValue = '';
      return;
    }

    this.farmTags.push({
      id: this.tagIdCounter,
      value: trimmedValue
    });
    this.tagIdCounter++;
    this.tagInputValue = '';
  }

  removeTag(tagId: number): void {
    this.farmTags = this.farmTags.filter(tag => tag.id !== tagId);
  }

  handleTagInput(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag(this.tagInputValue);
    }
  }

  focusTagInput(): void {
    const input = document.getElementById('farmTypeText');
    input?.focus();
  }

  getFarmTypesString(): string {
    return this.farmTags.map(tag => tag.value).join(', ');
  }

  onSubmit(): void {
    const submitData = {
      ...this.formData,
      farmTypes: this.getFarmTypesString(),
      coordinates: this.selectedCoordinates,
      address: this.selectedAddress
    };
    
    console.log('Form Submitted:', submitData);
  }

  logIng(f: NgForm) {
  this.spinner.show();

    if (f.invalid) {
      this.sharedService.handleError({ status: 400, error: { message: "Please verify your data before logging in." } }, f);
      return;
    }

    const request: AuthenticationRequest = {
      email: f.value["email"],
      password: f.value["password"]
    };

    this.authServer.login({ body: request }).subscribe({
      next: (res) => {
        this.spinner.hide()
        this.userEmail=request.email;
        Swal.fire(
          "Good job!", 
          "Please check your email for the verification code.", 
          "success")
        .then(() => {
          this.sharedService.openModal("VerificationAccountModal"); // 👈 Opens your custom modal
        });
      },
      error: (err) => {
        this.sharedService.handleError(err, f); // Pass the raw error object
      }
    });
  }


  onCodeCompleted1(code: string) {
    this.spinner.show();

    const request: VerificationRequest = {
      email: this.userEmail,
      code: code
    };

    this.authServer.verifyCode({ body: request }).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.sharedService.closeModal("VerificationAccountModal");
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        Swal.fire('Success!', 'You are now logged in.', 'success');
        this.verifyToken();

      },
  error: (err) => {
    this.spinner.hide();

    const backendError = err?.error?.error || 'Verification failed';

    // Always close modal first
    this.sharedService.closeModal("VerificationAccountModal");

    setTimeout(() => {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: backendError,
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then(() => {

        this.zone.run(() => {
          const codeInput1 = this.codeInput1();
          if (codeInput1) {
            codeInput1.reset();
          }

          // 🔒 HARD STOP cases
          if (
            backendError.includes('Maximum verification attempts') ||
            backendError.includes('expired')
          ) {
            // Do NOT reopen modal
            // Optional: redirect or show resend option
            return;
          }

          // 🔁 Retry allowed
          

          this.sharedService.openModal("VerificationAccountModal");
        });
      });
    }, 150);
  }


    });
  }


  signUp(f: NgForm): void {
  this.spinner.show();

  // ✅ Validation check
  if (f.invalid) {
    this.sharedService.handleError(
      { status: 400, error: { message: "Please fill in all required fields correctly." } },
      f
    );
    return;
  }

  // ✅ Build request from form values + component properties
  const request: RegistrationRequest = {
    fullName: f.value["fullName"],
    email: f.value["email"],
    password: f.value["password"],
    phoneNumber: f.value["phoneNumber"],
    experience: f.value["experience"] ? +f.value["experience"] : undefined,
    
    // ✅ Custom fields (not in ngForm) - kept as component properties
    farmType: this.farmTags.map(tag => tag.value), 
   farmLocation: this.formData.location ? {
      address: this.selectedAddress,
      lat: this.selectedLat ?? undefined,
      lng: this.selectedLng ?? undefined
    } : undefined
  };

  console.log(request)

  this.authServer.register({ body: request }).subscribe({
    next: (res) => {
      this.spinner.hide();
      this.userEmail = request.email;

      Swal.fire({
        title: 'Account Created!',
        text: 'We’ve sent a verification code to your email. Please enter it below to activate your account.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.sharedService.openModal("activationAccountModal");
      });
    },
    error: (err) => {
      this.spinner.hide();
      this.sharedService.handleError(err, f);
    }
  });
}

  onCodeCompleted2(code: string) {
    this.spinner.show();

    const request: VerificationRequest = {
      email: this.userEmail,
      code: code
    };

    this.authServer.activateAccount({ body: request }).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.sharedService.closeModal("activationAccountModal");

        

        Swal.fire({
          title: 'Welcome to TunisiaLuxe! 🎉',
          text: 'Your account has been successfully activated. You can now log in  our platform.',
          icon: 'success',
          confirmButtonText: 'Log In'
        }).then(()=>{
          this.sharedService.openModal("loginModal");


        });
      },
      error: (err) => {
        this.spinner.hide();
        const backendError = err?.error?.error || 'Activation failed. Please try again.';

        this.sharedService.closeModal("activationAccountModal");

        setTimeout(() => {
          Swal.fire({
            icon: 'error',
            title: 'Activation Failed',
            text: backendError,
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then(() => {
            this.zone.run(() => {
              // ✅ Fixed: reset codeInput2, not codeInput1
              const codeInput2 = this.codeInput2();
              if (codeInput2) {
                codeInput2.reset();
              }

              // 🔒 Hard stop on critical errors
              if (
                backendError.includes('Maximum verification attempts') ||
                backendError.includes('expired') ||
                backendError.includes('invalid')
              ) {
                // Do not reopen modal — user must restart flow or request new code
                // Optional: add "Resend Code" button later
                return;
              }

              // 🔁 Allow retry
              this.sharedService.openModal("activationAccountModal");
            });
          });
        }, 150);
      }
    });
  }
  verifyToken(){
      const token = localStorage.getItem("token");
    if (token) {
      const request = { token };
      this.authServer.verifyToken({ body: request }).subscribe({
        next: res => {
          this.isUserLoggedIn=true;
          this.tokenInfo=res;
          console.log(this.tokenInfo)
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }


  logOut(email:string) {
   
    this.authServer.logout({email:email})
    .subscribe({
      next:res=>{
        console.log(res);
        this.isUserLoggedIn=false;

        localStorage.clear();

        this.router.navigate(['/Home']);
      },
      error:err=>{console.log(err)}
    })

    
  }
}