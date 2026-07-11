import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import AOS from 'aos';
// import 'aos/dist/aos.css';
declare const PureCounter: any;
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 
 @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private renderer:Renderer2,
    private el:ElementRef,
  ){

  }
  ngOnInit(){
    this.activeFaqItem()
  }
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
   activeFaqItem() {
    const faqItems = this.el.nativeElement.querySelectorAll('.faq-item');
  
  
    faqItems.forEach((faqItem: HTMLElement) => {
      this.renderer.listen(faqItem, 'click', (event) => {
  
        faqItems.forEach((item: HTMLElement) => {
          this.renderer.removeClass(item, 'faq-active');
        });
  
        this.renderer.addClass(faqItem, 'faq-active');
  
        const content = faqItem.querySelector('.faq-content') as HTMLElement;
        if (content) {
          const isActive = faqItem.classList.contains('faq-active');
          this.renderer.setStyle(content, 'display', isActive ? 'block' : 'none');
        }
      });
    });
  }

}
