import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
  token: string | null = null;
  email: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  reset(form: NgForm) {
  if (form.valid && this.token && this.email) {
    const newPassword = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService
      .resetPassword(this.email, this.token, newPassword)
      .subscribe({
        next: () => {
          alert('Password reset successful!');
          this.router.navigate(['/login']);
        },
        error: () =>
          alert('Invalid token or error resetting password'),
      });
  }
}
}
