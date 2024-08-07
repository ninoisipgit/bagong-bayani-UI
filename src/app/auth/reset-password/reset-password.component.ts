import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {

  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      console.log('Reset Password Submitted!', formData);
      // Handle password reset logic here, e.g., send data to a server
    } else {
      console.log('Form is invalid');
    }
  }
}
