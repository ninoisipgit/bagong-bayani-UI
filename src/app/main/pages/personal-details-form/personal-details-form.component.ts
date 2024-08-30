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
  addressForm!: FormGroup;
  employmentForm!: FormGroup;

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

  constructor(private fb: FormBuilder,
    private locationService: LocationService,
    private authService : AuthService,
    private userDetails:UserDetailsService) {

    this.participantProfileForm = this.fb.group({
      // Personal Information
      id: [0],
      userId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MiddleName: [''],
      suffix: [''],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      civilstatus: ['', Validators.required],
      passportNo: [''],
      foreignaddress: [''],
      country: ['', Validators.required],
      contactnoabroad: [''],
    });

    this.addressForm = this.fb.group({
      // Philippine Address
      id: [0],
      userId: ['', Validators.required],
      provinceID: ['', Validators.required],
      cityID: ['', Validators.required],
      barangayID: ['', Validators.required],
      zipcode: [''],
      street: [''],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      religion: [''],
      education: [''],
      course: [''],
    });

    this.employmentForm = this.fb.group({
      // Employment Details
      id: [0],
      userId: ['', Validators.required],
      employerName: ['', Validators.required],
      employeraddress: ['', Validators.required],
      employercontactno: [''],
      vessel: [''],
      occupation: [''],
      salary: [''],
      agencyName: [''],
      contractDuration: [''],
      ofwType: [''],
      jobSite: [''],
      monthlySalary: [''],
      salarycurrency: ['']
    });

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {

    this.userDetails.getPersonalDetailsByUserId(this.user._id).subscribe((response) => {
      this.participantProfileForm.patchValue({
        userId:  this.user._id,
        id:  response.id,
        FirstName:  response.FirstName,
        LastName:  response.LastName,
        MiddleName:  response.MiddleName,
        suffix:  response.suffix,
        birthdate:  response.birthdate,
        gender:  response.gender,
        civilstatus:  response.civilStatus,
        passportNo:  response.passportNo,
        foreignaddress:  response?.foreignaddress,
        country:  response?.country,
        contactnoabroad:  response?.contactnoabroad,
      });
    });

    this.userDetails.getAddressByUserId(this.user._id).subscribe((response) => {
      this.addressForm.patchValue({
        userId:  this.user._id,
        id:  response.id,
        provinceID: response.provinceID,
        cityID: response.cityID,
        barangayID: response.barangayID,
        zipcode: response.zipcode,
        street: response.street,
        mobileNo: response.mobileNo,
        email: response.email,
        religion: response?.religion,
        education: response?.education,
        course: response?.course,
      });
    });

    this.userDetails.getEmploymentDetailsByUserId(this.user._id).subscribe((response) => {
      this.employmentForm.patchValue({
        userId:  this.user._id,
        id:  response.id,
        employerName: response.employerName,
        vessel: response.vessel,
        occupation: response.occupation,
        monthlySalary: response.monthlySalary,
        agencyName: response.agencyName,
        contractDuration: response.contractDuration,
        ofwType: response.ofwType,
        jobSite: response.jobSite,
        status: response.status,
      });
    });

    // Fetch countries
      this.locationService.getCountries().subscribe((data) => {
        this.countries = data.map((country: any) => country.name.common);
      });

    // Fetch provinces
    this.locationService.getProvinces().subscribe((data) => {
      this.provinces = data;
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

  onSubmitPersonalDetails(): void {
    const userProfile: UserProfile = {
      userId: this.user._id,
      id: this.participantProfileForm.value.id,
      FirstName: this.participantProfileForm.value.FirstName,
      LastName: this.participantProfileForm.value.LastName,
      MiddleName: this.participantProfileForm.value.MiddleName,
      suffix: this.participantProfileForm.value.suffix,
      birthdate: this.participantProfileForm.value.birthdate,
      gender: this.participantProfileForm.value.gender,
      civilStatus: this.participantProfileForm.value.civilstatus,
      passportNo:  this.participantProfileForm.value.passportNo,
      foreignaddress:  this.participantProfileForm.value?.foreignaddress,
      country:  this.participantProfileForm.value?.country,
      contactnoabroad:  this.participantProfileForm.value?.contactnoabroad,

      // educationalAttainment: this.participantProfileForm.value.educationalAttainment,
      // course: this.participantProfileForm.value.course,
      // addressID: this.participantProfileForm.value.addressID,
      // employmentDetailsID: this.participantProfileForm.value.employmentDetailsID,
      // tags: this.participantProfileForm.value.tags,
    };
    if(this.user){
      if(userProfile.id){
        this.userDetails.updatePersonalDetails(userProfile).subscribe((response) => {
          if(response) {
            console.log(response);
          }
        });
      }else{
        this.userDetails.savePersonalDetails(userProfile).subscribe((response) => {
          if(response) {
            console.log(response);
          }
        });
      }
    }



    // if (this.participantProfileForm.valid) {
    //   console.log('Form Submitted', this.participantProfileForm.value);
    //   // Handle the form submission logic here
    // } else {
    //   console.error('Form Invalid');
    // }
  }

  onSubmitAddress(): void {

    const address: any = {
      userId: this.user._id,
      id: this.addressForm.value.id,
      provinceID: this.addressForm.value.provinceID,
      cityID: this.addressForm.value.cityID,
      barangayID: this.addressForm.value.barangayID,
      zipcode: this.addressForm.value.zipcode,
      street: this.addressForm.value.street,
      mobileNo: this.addressForm.value.mobileNo,
      email: this.addressForm.value.email,

      // educationalAttainment: this.participantProfileForm.value.educationalAttainment,
      // course: this.participantProfileForm.value.course,
      // addressID: this.participantProfileForm.value.addressID,
      // employmentDetailsID: this.participantProfileForm.value.employmentDetailsID,
      // tags: this.participantProfileForm.value.tags,
    };
    if(this.user){
      if(address.id){
        this.userDetails.updateAddress(address).subscribe((response) => {
          if(response) {
            console.log(response);
          }
        });
      }else{
        this.userDetails.saveAddress(address).subscribe((response) => {
          if(response) {
            console.log(response);
          }
        });
      }
    }

  }

  onSubmitEmploymentDetails(): void {

    const value: any = {
      userId: this.user._id,
      id: this.employmentForm.value.id,
      employerName: this.employmentForm.value.employerName,
      vessel: this.employmentForm.value.vessel,
      occupation: this.employmentForm.value.occupation,
      monthlySalary: this.employmentForm.value.monthlySalary,
      agencyName: this.employmentForm.value.agencyName,
      contractDuration: this.employmentForm.value.contractDuration,
      ofwType: this.employmentForm.value.ofwType,
      jobSite: this.employmentForm.value.jobSite,
      status: this.employmentForm.value.status,

      // educationalAttainment: this.participantProfileForm.value.educationalAttainment,
      // course: this.participantProfileForm.value.course,
      // addressID: this.participantProfileForm.value.addressID,
      // employmentDetailsID: this.participantProfileForm.value.employmentDetailsID,
      // tags: this.participantProfileForm.value.tags,
    };
    if(this.user){
      if(value.id){
        this.userDetails.updateEmploymentDetails(value).subscribe((response) => {
          if(response) {
            console.log(response);
          }
        });
      }else{
        this.userDetails.saveEmploymentDetails(value).subscribe((response) => {
          if(response) {
            console.log(response);
          }
        });
      }
    }

  }
}
