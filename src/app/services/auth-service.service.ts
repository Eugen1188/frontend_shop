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

  register(user: any) {
    return this.http.post('http://127.0.0.1:8000/api/register/', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
