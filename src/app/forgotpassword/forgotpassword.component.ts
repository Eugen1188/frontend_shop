import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  constructor(private authService: AuthService) {}

  reset(NgForm: NgForm) {
    if (NgForm.valid) {
      const email = NgForm.value.email;
     console.log(email);
     
      this.authService.requestPasswordReset(email).subscribe({
        next: (res) => {
          console.log(res.message);
          alert('Password reset email sent');
        },
        error: (err) => {
          console.log(err);
          alert('Error sending password reset email');
        },
      });
    }
  }
}
