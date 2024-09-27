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
  step: number = 1;
  isLoading: boolean = false;

  showPassword: boolean = false;
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
      password: [''],
      user_type: [null, Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  verifyEmail() {
    if (!this.signupForm.valid) {
      this.showToast('Complete required fields!', 'Sign up', 'danger');
      return;
    }
    this.isLoading = true; // Start loading before the try-catch
    this.authService.verifyEmail(this.signupForm.value).subscribe({
      next: (res: any) => {
        if (!res.error) {
          this.step = 2;
          this.timer = 60;
          this.countdown();
        } else {
          this.showToast(res.error, '', 'danger');
        }
      },
      error: (err) => {
        this.showToast(err, 'danger', 'danger');
      },
      complete: () => {
        this.isLoading = false; // Stop loading only when the request is complete
      },
    });
  }

  verifyVerificationCode() {
    if (this.isLoading) return; // Prevent duplicate requests if already loading

    if (!this.verificationCode) {
      this.showToast('Enter Verification Code', 'Verify Email', 'danger');
      return;
    }
    this.isLoading = true; // Set loading to true

    this.authService
      .verifyVerificationCode({
        verificationCode: this.verificationCode,
        email: this.signupForm.value.email,
      })
      .subscribe({
        next: (res: any) => {
          if (!res.error) {
            this.step = 3;
          } else {
            this.showToast(res.error, '', 'danger');
          }
        },
        error: (err) => {
          this.showToast(err, 'danger', 'danger');
        },
        complete: () => {
          this.isLoading = false; // Ensure loading stops on completion
        },
      });
  }

  signup(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.authService.signUp(formData).subscribe((response: any) => {
        if (!response.error) {
          if (response.user_type == 1) {
            window.location.href = '/main/company-details';
          } else if (response.user_type == 2) {
            window.location.href = '/main/personal-details';
          } else if (response.user_type == 3) {
            window.location.href = '/main/events-management';
          }
        }
      });
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

  getStepLabel() {
    let label = '';
    switch (this.step) {
      case 1:
        label = 'Sign Up';
        break;

      case 2:
        label = 'Verification Code';
        break;

      case 3:
        label = 'Enter Password';
        break;
      default:
        break;
    }
    return label;
  }

  timer: number = 60;
  interval: any; // to store the interval reference

  countdown() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval); // Stop the timer when it reaches zero
      }
    }, 1000); // 1000ms = 1 second
  }
}
