import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface FarmTag {
  id: number;
  value: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
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
}