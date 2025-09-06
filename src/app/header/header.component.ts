import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  show = false;
  hello() {
    this.show = true;
  }
}
