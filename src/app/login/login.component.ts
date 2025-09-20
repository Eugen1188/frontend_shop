import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  errors = '';
  constructor(private http: HttpClient, private _router: Router) {}

  login(form: NgForm) {
    console.log(this.username + this.password);

    this.http
      .post('http://localhost:8000/api/token/', {
        username: this.username, // or email if using custom JWT
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.access);
          console.log('Token saved:', res.access);
          form.reset();
          console.log(res.adress);
          this._router.navigate(['/userprofile']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errors = 'Invalid username/email or password.';
          } else {
            this.errors = 'An unexpected error occurred. Please try again.';
          }
        },
      });
  }
}
