import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  verificationCode: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    // Initialize the form group
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      user_type: [1],
    });
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  verifyEmail() {
    console.log(this.signupForm.valid);
    console.log(this.signupForm.value.email);

    this.authService.verifyEmail(this.signupForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  verifyVerificationCode() {
    this.authService
      .verifyVerificationCode({
        verificationCode: this.verificationCode,
        email: this.signupForm.value.email,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  signup(): void {
    if (this.signupForm.valid) {
      // Handle the signup logic here, e.g., make an API call
      console.log('Form Submitted', this.signupForm.value);

      // Optionally navigate to another page after successful signup
      // this.router.navigate(['/some-route']);
    } else {
      // Mark all fields as touched to display validation errors
      this.signupForm.markAllAsTouched();
    }
  }

  showToast(message: any, title: string, status: string) {
    this.toastrService.show(message, title, { status });
  }
}
