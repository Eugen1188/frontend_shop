import { Component, inject } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { ProduktPreviewComponentComponent } from "../produkt-preview-component/produkt-preview-component.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filterdiv',
  imports: [ ProduktPreviewComponentComponent,CommonModule],
  templateUrl: './filterdiv.component.html',
  styleUrl: './filterdiv.component.scss',
})
export class FilterdivComponent {
  backendService = inject(BackendService);
  
  ngOnInit(): void {
    this.backendService.loadingproducts();
  }
}
