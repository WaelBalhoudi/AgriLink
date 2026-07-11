import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-agri-services',
  imports: [HeroComponent],
  templateUrl: './agri-services.component.html',
  styleUrl: './agri-services.component.css'
})
export class AgriServicesComponent {
  hero = new Hero('Agri Services', 'Agri Services', 'assets/img/hero-carousel/1.png');

}
