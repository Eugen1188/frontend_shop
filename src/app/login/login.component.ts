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
    if (form.valid)
      this.http
        .post('http://localhost:8000/api/login-token/', {
          username: this.username, // or email if using custom JWT
          password: this.password,
        })
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('access_token', res.access);
            console.log('Token saved:', res.access);
            form.reset();
            this._router.navigate(['/userprofile']);
          },
          error: (err) => {
            if (err.status === 401) {
              this.errors = 'Ungültiger Benutzername/E-Mail oder Passwort.';
            } else if (err.status === 400) {
              this.errors = err.error.non_field_errors[0];
            } else {
              this.errors =
                'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            }
          },
        });
  }
}
