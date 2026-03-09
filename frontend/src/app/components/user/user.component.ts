import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./pages/footer/footer.component";
import { HeaderComponent } from './pages/header/header.component';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, FooterComponent,HeaderComponent,FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
