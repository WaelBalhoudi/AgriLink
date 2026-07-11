import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-weather',
  imports: [HeroComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  hero = new Hero('Weather', 'Weather', 'assets/img/hero-carousel/2.png');

}
