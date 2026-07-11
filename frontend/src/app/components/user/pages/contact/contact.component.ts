import { Component } from '@angular/core';
import { Hero } from '../../../../models/hero';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-contact',
  imports: [HeroComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  hero = new Hero('Contact', 'Contact', 'assets/img/hero-carousel/1.png');

}
