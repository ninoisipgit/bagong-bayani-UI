import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAuthSocialLink } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  socialLinks!: NbAuthSocialLink[];
  user: any;
  isAuthenticated = false;
  showPassword: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        if (this.user._type == 1) {
          window.location.href = '/main/manage-jobs-list';
        } else if (this.user._type == 2) {
          window.location.href = '/main/jobs';
        } else if (this.user._type == 3) {
          window.location.href = '/main/events-management';
        }
      }
    });
  }
  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login Submitted!', formData);

      this.authService.login(formData.email, formData.password).subscribe(
        (res) => {
          if (res) {
            // this.router.navigate(['/main/jobs']);
            // window.location.href = '/main/jobs';
          }
        },
        (error) => {
          this.showToast(error.error.error, 'danger', 'danger');
        }
      );
      // Handle login logic here, e.g., send data to a server
    } else {
      this.showToast('Complete Fields', 'Login', 'danger');
    }
  }

  // Helper method to get form controls
  get f() {
    return this.loginForm.controls;
  }

  showToast(message: any, title: string, status: string) {
    this.toastrService.show(message, title, { status });
  }
}
