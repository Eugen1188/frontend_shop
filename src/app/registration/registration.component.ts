import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  telefonumber: string;
  address: string;
  birthday: string;
}

@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  constructor(private autservice: AuthService, private _router: Router) {}
  user = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    telefonumber: '',
    address: '',
    birthday: '',
  };

  print(form: NgForm) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      if (control.invalid) {
        console.log(`Invalid field: ${key}`, control.errors);
      }
    });
    const payload = {
      name: this.user.name,
      lastname: this.user.lastname,
      email: this.user.email,
      password: this.user.password,
      telefonumber: this.user.telefonumber,
      address: this.user.address,
      birthday: this.user.birthday, // must be YYYY-MM-DD
    };
    console.log(payload);

    if (form.valid) {
      this.autservice.register(payload).subscribe({
        next: (res) => {
          console.log('registered', res);
          alert('registered');
          form.reset();
          this._router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Registration failed: ' + (err.error?.message || err.message));
        },
      });
    }
  }
}
