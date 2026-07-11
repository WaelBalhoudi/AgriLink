import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-farmers',
  imports: [HeroComponent],
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.css'
})
export class FarmersComponent {
  hero = new Hero('Farmers', 'Farmers', 'assets/img/hero-carousel/4.png');

}
