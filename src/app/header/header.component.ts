import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  show = inject(SharedService);
  open() {
    this.show.show = true;
  }
}
