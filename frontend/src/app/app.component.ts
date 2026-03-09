import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AgriLink';
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show();
    setTimeout(() => this.spinner.hide(), 1500);
  }
  showAlert(){
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
}
