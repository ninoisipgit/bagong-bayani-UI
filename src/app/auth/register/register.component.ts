import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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
          }else{
            window.location.href = '/main/personal-details';
          }
        }
      },err => {
        console.log(err);
      }
    );
    } else {
      console.log('Form is invalid');
    }
  }



}
