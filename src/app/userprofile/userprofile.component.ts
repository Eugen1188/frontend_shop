import { Component, inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  profile: any;

  constructor(private http: HttpClient, private _router: Router) {}

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

  accountdelete() {
    const token = localStorage.getItem('access_token');
    this.http
      .delete('http://localhost:8000/api/delete/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          localStorage.removeItem('access_token');
          this._router.navigate(['/login']);
        },
        error: (err) => console.error('Error deleting account', err),
      });
  }
}
