import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient) {}

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
        },
        error: (err) => console.error('Login error', err),
      });
  }
}
