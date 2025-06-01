import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LandingHeroComponent } from './landing-hero/landing-hero.component';
import { ProduktlisteComponent } from './produktliste/produktliste.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shop-app';
}
