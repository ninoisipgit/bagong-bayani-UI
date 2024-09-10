import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { EmployerDetails } from 'src/app/shared/models/employer-details';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.scss']
})
export class EmployerDetailsComponent {
  companyForm!: FormGroup;
  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;
  selectedId:number = 0;
  constructor(private fb: FormBuilder, private userDetailsService:UserDetailsService,private authService : AuthService,private toastrService: NbToastrService) {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      userId: [this.user._id, Validators.required],
      companyName: ['', [Validators.required, Validators.maxLength(255)]],
      companyType: ['', [Validators.required, Validators.maxLength(255)]],
      same_as: ['', Validators.pattern('https?://.+')],
      logo: ['', Validators.pattern('https?://.+')],
      industry: ['', Validators.required],
      description: ['', Validators.required],
      mission: ['', Validators.required],
      vision: ['', Validators.required],
      addressID: ['', Validators.required],
    });

    this.getCompanyDetails();
  }

  getCompanyDetails(): void {

    this.userDetailsService.getEmployerDetails(this.user._id).subscribe(
      (details: EmployerDetails) => {
        details;
        this.selectedId = details?.id ?? 0;
        this.companyForm.patchValue({
          userId: this.user._id,
          companyName: details.companyName,
          companyType: details.companyType,
          same_as: details.same_as,
          logo: details.logo,
          industry: details.industry,
          description: details.description,
          mission: details.mission,
          vision: details.vision,
          addressID: details.addressID,
        });
      },
      (error) => {
        console.error('Error fetching company details', error);
      }
    );
  }

  onSubmit(): void {

    if(this.selectedId > 0){
        this.onUpdate();
    }else{
      if (this.companyForm.valid) {
        console.log(this.companyForm.value);
        const employerDetails: EmployerDetails = {
          userId: this.user._id,
          companyName: this.companyForm.value.companyName,
          companyType: this.companyForm.value.companyType,
          same_as: this.companyForm.value.same_as,
          logo: this.companyForm.value.logo,
          industry: this.companyForm.value.industry,
          description: this.companyForm.value.description,
          mission: this.companyForm.value.mission,
          vision: this.companyForm.value.vision,
          addressID: this.companyForm.value.addressID,
        };
        this.userDetailsService.saveUpdateEmployerDetails(this.companyForm.value).subscribe((response) => {
          if(response) {
            this.companyForm.markAsUntouched();
            console.log(response);
              // Show success toast
            this.showToast('Form submitted successfully!', 'Success', 'success');
          }
        })
      }
    }
  }

  onUpdate(): void {
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);
      const employerDetails: EmployerDetails = {
        userId: this.user._id,
        companyName: this.companyForm.value.companyName,
        companyType: this.companyForm.value.companyType,
        same_as: this.companyForm.value.same_as,
        logo: this.companyForm.value.logo,
        industry: this.companyForm.value.industry,
        description: this.companyForm.value.description,
        mission: this.companyForm.value.mission,
        vision: this.companyForm.value.vision,
        addressID: this.companyForm.value.addressID,
      };
      this.userDetailsService.updateEmployerDetails(this.companyForm.value,this.selectedId).subscribe((response) => {
        if(response) {
          this.companyForm.markAsUntouched();
          console.log(response);
            // Show success toast
          this.showToast('Form submitted successfully!', 'Success', 'success');
        }
      })
    }
  }

     // Helper method to check if a form control is invalid and touched
     isInvalid(controlName: string): boolean {
      const control = this.companyForm.get(controlName);
      return control !== null && control !== undefined && control.invalid ;
    }

    showToast(message: string, title: string, status: string) {
      this.toastrService.show(message, title, { status });
    }

}
