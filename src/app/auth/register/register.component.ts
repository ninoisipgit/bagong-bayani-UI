import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      user_type: [1, Validators.required],
    });
  }

  ngOnInit() {

  }

  signup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.authService.signUp(formData).subscribe((response) => {
        if(response) {
          if(response.user_type == 1){
            window.location.href = '/main/company-details';
          }else if(response.user_type == 2){
            window.location.href = '/main/personal-details';
          }else if(response.user_type == 3){
            window.location.href = '/main/events-management';
          }
        }
      },err => {
        for (let key in err.error) {
          if (err.error.hasOwnProperty(key)) {
            const errorMessage = err.error[key][0];
            this.showToast(errorMessage, 'danger', 'danger');
          }
        }
      }
    );
    } else {
      console.log('Form is invalid');
    }
  }

  showToast(message: any, title: string, status: string) {
    this.toastrService.show(message, title, { status });
  }


}
