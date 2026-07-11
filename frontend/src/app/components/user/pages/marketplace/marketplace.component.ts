import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-marketplace',
  imports: [HeroComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent {
  hero = new Hero('Market Place', 'Market Place', 'assets/img/hero-carousel/3.png');

}
