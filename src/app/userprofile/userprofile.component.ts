import { Component, inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  profile: any;

  constructor(private http: HttpClient,private _router: Router) {}

  ngOnInit() {
    this.http.get('http://localhost:8000/api/profile/').subscribe({
      next: (data) => (this.profile = data),
      error: (err) => console.error('Error fetching profile', err),
    });
    setTimeout(() => {
      console.log(this.profile);
    }, 1000);
  }

  logout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }
}
