import { Component, inject } from '@angular/core';
import { BackendService, Category, Product } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { ProduktPreviewComponentComponent } from '../produkt-preview-component/produkt-preview-component.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-produktliste',
  imports: [CommonModule, ProduktPreviewComponentComponent, FiltersComponent],
  templateUrl: './produktliste.component.html',
  styleUrl: './produktliste.component.scss',
})
export class ProduktlisteComponent {
  backend: BackendService = inject(BackendService);

  ngOnInit(){
    this.backend.loadingproducts();
  }
}
