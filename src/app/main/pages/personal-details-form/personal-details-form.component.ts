import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { UserProfile } from 'src/app/shared/models/user-profile';
import { LocationService } from 'src/app/shared/services/location.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss']
})
export class PersonalDetailsFormComponent implements OnInit  {
  participantProfileForm!: FormGroup;

  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  barangays: any[] = [];

  selectedCountry = '';
  selectedProvince = '';
  selectedCity = '';
  selectedBarangay = '';

  constructor(private fb: FormBuilder,private locationService: LocationService,private authService : AuthService, private userDetails:UserDetailsService) {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {
    // Fetch countries
      this.locationService.getCountries().subscribe((data) => {
        this.countries = data.map((country: any) => country.name.common);
      });

    // Fetch provinces
    this.locationService.getProvinces().subscribe((data) => {
      this.provinces = data;
    });


    this.participantProfileForm = this.fb.group({
      // Personal Information
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      middlename: [''],
      suffix: [''],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      civilstatus: ['', Validators.required],
      passportno: [''],
      foreignaddress: [''],
      country: ['', Validators.required],
      contactnoabroad: [''],

      // Philippine Address
      province: ['', Validators.required],
      municipality: ['', Validators.required],
      barangay: ['', Validators.required],
      zipcode: [''],
      houseunitno: [''],
      mobileno: ['', Validators.required],
      emailaddress: ['', [Validators.required, Validators.email]],
      religion: [''],
      education: [''],
      course: [''],

      // Employment Details
      employer: ['', Validators.required],
      employeraddress: ['', Validators.required],
      employercontactno: [''],
      vessel: [''],
      position: [''],
      salary: [''],
      agency: [''],
      contractduration: [''],
      ofwtype: [''],
      jobsite: [''],
      salarycurrency: ['']
    });
  }

  onProvinceChange(provinceId: string) {
    // Fetch cities based on selected province
    this.locationService.getCities(provinceId).subscribe((data) => {
      this.cities = data;
    });
  }

  onCityChange(cityId: string) {
    // Fetch barangays based on selected city
    this.locationService.getBarangays(cityId).subscribe((data) => {
      this.barangays = data;
    });
  }

  onSubmit(): void {

    const userProfile: UserProfile = {
      userId: this.user._id,
      firstName: this.participantProfileForm.value.firstname,
      lastName: this.participantProfileForm.value.lastname,
      middleName: this.participantProfileForm.value.middlename,
      suffix: this.participantProfileForm.value.suffix,
      birthdate: this.participantProfileForm.value.birthdate,
      gender: this.participantProfileForm.value.gender,
      civilStatus: this.participantProfileForm.value.civilstatus,
      religion: this.participantProfileForm.value.religion,
      educationalAttainment: this.participantProfileForm.value.educationalAttainment,
      course: this.participantProfileForm.value.course,
      addressID: this.participantProfileForm.value.addressID,
      employmentDetailsID: this.participantProfileForm.value.employmentDetailsID,
      tags: this.participantProfileForm.value.tags,
    };
    console.log(userProfile);
    if(this.user){
      this.userDetails.saveUpdatePersonalDetails(userProfile).subscribe((response) => {
        if(response) {
          console.log(response);
        }
      });
    }

    // if (this.participantProfileForm.valid) {
    //   console.log('Form Submitted', this.participantProfileForm.value);
    //   // Handle the form submission logic here
    // } else {
    //   console.error('Form Invalid');
    // }
  }

}
