import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../../services/services/shared/shared.service';
import { UserDto } from '../../services/models';
@Component({
  selector: 'app-farmer-profile',
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './farmer-profile.component.html',
  styleUrl: './farmer-profile.component.css'
})
export class FarmerProfileComponent {
  year = new Date().getFullYear();
  sidebarOpen = false;
  tokenInfo:any;
  userData:UserDto={
    address: '',
    cin: 0,
    dateOfBirth: '',
    email: '',
    fullName: '',
    phoneNumber: 0
  }

  constructor(
      private authServer:AuthenticationService,
      private spinner:NgxSpinnerService,
      private sharedService:SharedService,
      private router:Router,
  ){}
  ngOnInit(){
    this.verifyToken();
  }
  toggleMenu() {

    this.sidebarOpen = !this.sidebarOpen;

    const body = document.body;

    if (this.sidebarOpen) {
      body.classList.add("layout-menu-expanded");
    } else {
      body.classList.remove("layout-menu-expanded");
    }

  }

  
  toggleSearch() {
      // Toggle mobile search visibility
      const searchDiv = document.querySelector('.mobile-search');
      searchDiv?.classList.toggle('d-none');
  }
    verifyToken(){
      const token = localStorage.getItem("token");
    if (token) {
      const request = { token };
      this.authServer.verifyToken({ body: request }).subscribe({
        next: res => {
          this.tokenInfo=res;
          this.userData.fullName=this.tokenInfo.fullName,
          this.userData.email=this.tokenInfo.sub;
          console.log(this.userData)
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

 logOut() {
   
    this.authServer.logout({email:this.userData.email})
    .subscribe({
      next:res=>{
        localStorage.clear();
        this.router.navigate(['/Home']);
      },
      error:err=>{console.log(err)}
    })

    
  }


}
