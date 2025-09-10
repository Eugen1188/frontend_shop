import { Component, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  show = inject(SharedService);
  backend = inject(BackendService)

  close() {
    if ((this.show.show = true)) {
      this.show.show = false;
    } else {
      return;
    }
  }
}
