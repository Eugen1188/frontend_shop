import { Component, inject } from '@angular/core';
import { ProduktPreviewComponentComponent } from '../produkt-preview-component/produkt-preview-component.component';
import { BackendService, Category, Product } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-hero',
  imports: [ProduktPreviewComponentComponent, CommonModule, RouterLink],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.scss',
})
export class LandingHeroComponent {
  count = 1;
  backendService = inject(BackendService);

  ngOnInit(): void {
    this.backendService.loadingproducts();
    console.log(this.backendService.loadedProducts);
    
  }
}
