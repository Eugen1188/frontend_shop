import { Component } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produkt-preview-component',
  imports: [ProductDetailsComponent, CommonModule],
  templateUrl: './produkt-preview-component.component.html',
  styleUrl: './produkt-preview-component.component.scss',
})
export class ProduktPreviewComponentComponent {
  detailsVisible = false;

  openDetails() {
        console.log('Produkt angeklickt');

    this.detailsVisible = true;
  }

  closeDetails() {
    this.detailsVisible = false;
  }
}
