import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetForm: FormGroup;

  displayResetForm  = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.fb.group({
      otp: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      this.authService.forgotPassword(formData.email).subscribe((response) => {
        if(response){
          this.displayResetForm = true;
          this.resetForm.patchValue({
            email:formData.email
          });
        }
      }, err=> {
        console.log('invalidemail')

      })
      console.log('Reset Password Submitted!', formData);
      // Handle password reset logic here, e.g., send data to a server
    } else {
      console.log('Form is invalid');
    }
  }

  submitResetPassword(){
    if (this.resetForm.valid) {
      const formData = this.resetForm.value;
      this.authService.submitResetPassword(formData).subscribe((response) => {
        if(response){
          this.router.navigate(['/auth/login']);
        }
      }, err=> {
        console.log('invalidemail')

      })
      console.log('Reset Password Submitted!', formData);
      // Handle password reset logic here, e.g., send data to a server
    } else {
      console.log('Form is invalid');
    }

  }
}
