import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    year = new Date().getFullYear();
  sidebarOpen = false;

  toggleMenu() {

    this.sidebarOpen = !this.sidebarOpen;

    const body = document.body;

    if (this.sidebarOpen) {
      body.classList.add("layout-menu-expanded");
    } else {
      body.classList.remove("layout-menu-expanded");
    }

  }
}
