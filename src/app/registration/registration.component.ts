import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';

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
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  constructor(private autservice: AuthService) {}
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
    if (form.valid) {
      this.autservice.register(this.user).subscribe({
        next: (res) => {
          console.log('registered', res);
          alert('registered');
          form.reset();
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Registration failed!');
        },
      });
    }
  }
}
