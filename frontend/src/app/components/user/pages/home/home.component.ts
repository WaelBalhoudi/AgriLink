import { Component, ElementRef, ViewChild } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
declare const PureCounter: any;
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 @ViewChild('fileInput') fileInput!: ElementRef;
 ngAfterViewInit(): void {
    AOS.init({
      once: true, // animation happens only once
      duration: 800,
      offset: 100,
      easing: 'ease-in-out',
    });
     new PureCounter();



  }
  openCamera() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      console.log("Image selected:", file);

      // Later you will send this image to backend
      // this.uploadImage(file);
    }
  }
}
