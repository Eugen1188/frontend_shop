import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    telefonnummer: '',
    Kommentar: '',
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid) {
      console.log(this.contactData);
      ngForm.reset();
    }
  }
}
