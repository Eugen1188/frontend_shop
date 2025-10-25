import { Component, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { BackendService } from '../services/backend.service';
import { FilterdivComponent } from '../filterdiv/filterdiv.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-searchbar',
  imports: [FilterdivComponent,CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  show = inject(SharedService);
  backend = inject(BackendService);
  showDropdown = false;

  close() {
    if ((this.show.show = true)) {
      this.show.show = false;
    } else {
      return;
    }
  }

  onSearchInput(event: any) {
    const value = event.target?.value || event; // adjust depending on output
    this.showDropdown = value.length > 0;
  }
}
