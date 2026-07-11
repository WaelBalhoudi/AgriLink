import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import {  NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AgriLink';
 constructor(
  private spinner: NgxSpinnerService,
    private router:Router,
    private viewportScroller: ViewportScroller,

  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
      }
    });
  }
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
