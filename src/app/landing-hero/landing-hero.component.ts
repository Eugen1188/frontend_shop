import { Component } from '@angular/core';
import { ProduktPreviewComponentComponent } from "../produkt-preview-component/produkt-preview-component.component";

@Component({
  selector: 'app-landing-hero',
  imports: [ProduktPreviewComponentComponent],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.scss'
})
export class LandingHeroComponent {

}
