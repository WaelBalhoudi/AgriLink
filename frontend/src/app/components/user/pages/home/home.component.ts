import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 @ViewChild('fileInput') fileInput!: ElementRef;

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
