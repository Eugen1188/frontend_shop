import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, FormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  profile: any = {};
  editing = false;

  constructor(private http: HttpClient, private _router: Router) {}

  ngOnInit() {
    this.http.get('http://localhost:8000/api/profile/').subscribe({
      next: (data) => {
        this.profile = data;
        console.log(this.profile);
      },
      error: (err) => {
        localStorage.removeItem('access_token');
        this._router.navigate(['/login']);
      },
    });
  }

  modify() {
    this.editing = !this.editing;
  }

  save() {
    const token = localStorage.getItem('access_token');

    this.http
      .put('http://localhost:8000/api/savedprofile/', this.profile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (data) => {
          this.profile = data;
          console.log(this.profile);

          this.editing = false; // exit edit mode
        },
        error: (err) => console.error('Error saving profile', err),
      });
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
