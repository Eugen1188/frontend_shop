import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  telefonumber: string;
  address: string;
  birthday: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(user: RegisterData) {
    const payload = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      telefonumber: user.telefonumber,
      address: user.address,
      birthday: user.birthday, // must be YYYY-MM-DD
    };
    return this.http.post(`${this.apiUrl}/register/`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
