import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { UserProfile } from 'src/app/shared/models/user-profile';
import { LocationService } from 'src/app/shared/services/location.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent {
  @Input() parentData!: string;

  languages = [];
  skills = [];
  participantProfileForm!: FormGroup;
  addressForm!: FormGroup;

  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;
  personID: number = 0;
  jobID: number = 0;
  readonly: boolean = false;

  countries: any[] = [];
  regions: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  barangays: any[] = [];
  selectedCity = '';
  CountryISO = CountryISO; // Assign the enum to a public variable
  SearchCountryField = SearchCountryField;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private userDetails: UserDetailsService,
    private locationService: LocationService,
    private router: Router
  ) {
    this.participantProfileForm = this.fb.group({
      // Personal Information
      id: [0],
      userId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MiddleName: [''],
      suffix: ['', Validators.maxLength(10)],
      birthdate: [new Date(), Validators.required],
      gender: ['', Validators.required],
      civilstatus: ['', Validators.required],
      passportNo: ['', Validators.required],
      languages: [''],
      tags: [''],
      aboutMe: [''],
    });

    this.addressForm = this.fb.group({
      // Philippine Address
      id: [0],
      userId: ['', Validators.required],
      provinceID: ['', Validators.required],
      regionID: ['', Validators.required],
      cityID: ['', Validators.required],
      barangayID: ['', Validators.required],
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      religion: [''],
      education: [''],
      course: [''],
      ofwForeignAddress: ['', Validators.required],
      ofwCountry: ['', Validators.required],
      ofwContactNo: ['', Validators.required],
    });

    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.personID = user?._id;
        this.isAuthenticated = !!user;
        if (this.user._type == 3) {
          this.readonly = true;
          this.route.paramMap.subscribe((params) => {
            this.personID = Number(params.get('userId'));
            this.jobID = Number(params.get('jobID'));
          });
        }
      }
    });
  }
  ngOnInit(): void {
    this.getUserDetails();
    this.getAddressByUserID();
    this.getAddressResources();
  }

  isInvalid(controlName: string, form: FormGroup): string {
    return !!form.get(controlName)?.invalid ? 'is-invalid' : '';
  }
  showToast(message: string, title: string, status: string) {
    this.toastrService.show('Form submitted successfully!', title, { status });
  }

  getUserDetails() {
    this.userDetails
      .getPersonalDetailsByUserId(this.personID)
      .subscribe((response) => {
        if (response) {
          const skills = response.tags?.split(',').map((item: string) => {
            const trimmedItem = item.trim();
            return { display: trimmedItem, value: trimmedItem };
          });
          const language = response.languages
            ?.split(',')
            .map((item: string) => {
              const trimmedItem = item.trim();
              return { display: trimmedItem, value: trimmedItem };
            });

          const date = new Date(response.birthdate);
          this.participantProfileForm.patchValue({
            userId: this.personID,
            id: response.id,
            FirstName: response.FirstName,
            LastName: response.LastName,
            MiddleName: response.MiddleName,
            suffix: response.suffix ? response.suffix : '',
            birthdate: date.toISOString().split('T')[0],
            gender: response.gender,
            civilstatus: response.civilStatus,
            passportNo: response.passportNo,
            tags: skills,
            languages: language,
            aboutMe: response.aboutMe,
          });
        }
      });
  }
  getAddressByUserID() {
    this.userDetails.getAddressByUserId(this.personID).subscribe((response) => {
      if (response) {
        this.addressForm.patchValue({
          userId: this.personID,
          id: response.id,
          provinceID: response.provinceID,
          regionID: response.regionID,
          cityID: response.cityID,
          barangayID: response.barangayID,
          zipcode: response.zipcode,
          street: response.street,
          mobileNo: response.mobileNo,
          email: response.email,
          religion: response?.religion,
          education: response?.education,
          course: response?.course,
          ofwForeignAddress: response?.ofwForeignAddress,
          ofwCountry: response?.ofwCountry,
          ofwContactNo: response?.ofwContactNo,
        });
      }
    });
  }

  getAddressResources() {
    this.locationService.getCountries().subscribe((data) => {
      this.countries = data.map((country: any) => country.name.common);
    });
    this.locationService.getRegions().subscribe((data) => {
      this.regions = data;
      if (this.addressForm.controls['regionID'].value) {
        this.locationService
          .getProvinces(this.addressForm.controls['regionID'].value)
          .subscribe((data) => {
            this.provinces = data;
          });
        // Check if provinceID is selected and fetch cities
        if (this.addressForm.controls['provinceID'].value) {
          this.locationService
            .getCities(this.addressForm.controls['provinceID'].value)
            .subscribe((data) => {
              this.cities = data;

              // Check if cityID is selected after fetching cities
              const cityId = this.addressForm.controls['cityID'].value;
              if (cityId) {
                const selectedCity =
                  this.cities.find((city) => city.code === cityId) || {};
                const cityCode = selectedCity.isCity === 1 ? cityId : '';
                const municipalityCode =
                  selectedCity.isMunicipality === 1 ? cityId : '';

                // Only call getBarangays if at least one code is valid
                if (cityCode || municipalityCode) {
                  const payload = {
                    cityCode: cityCode,
                    municipalityCode: municipalityCode,
                  };

                  this.locationService
                    .getBarangays(payload)
                    .subscribe((data) => {
                      this.barangays = data;
                    });
                }
              }
            });
        }
      }
    });
  }

  onSubmitPersonalDetails(): void {
    const tagsValue = this.participantProfileForm.value.tags;
    const skills: string = Array.isArray(tagsValue)
      ? tagsValue.map((obj: { value: string }) => obj.value).join(', ')
      : tagsValue || '';

    const languagesValue = this.participantProfileForm.value.languages;
    const languages: string = Array.isArray(languagesValue)
      ? languagesValue.map((obj: { value: string }) => obj.value).join(', ')
      : languagesValue || '';

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
      passportNo: this.participantProfileForm.value.passportNo,
      tags: skills,
      languages: languages,
      aboutMe: this.participantProfileForm.value.aboutMe,
    };

    if (this.user) {
      const formData = new FormData();

      // Append userProfile properties to FormData
      for (const key in userProfile) {
        if (userProfile.hasOwnProperty(key)) {
          formData.append(
            key as keyof UserProfile,
            userProfile[key as keyof UserProfile]
          );
        }
      }

      // Now send the formData
      this.userDetails.savePersonalDetails(formData).subscribe((response) => {
        if (response) {
          // this.showToast(
          //   'Personal information saved successfully!',
          //   'Success',
          //   'success'
          // );
          console.log(response);
        }
      });
    }
  }
  onSubmitAddress(): void {
    // console.log(this.addressForm);
    // if (this.addressForm.invalid) {
    //   return;
    // }
    const address: any = {
      userId: this.user._id,
      id: this.addressForm.value.id,
      provinceID: this.addressForm.value.provinceID,
      regionID: this.addressForm.value.regionID,
      cityID: this.addressForm.value.cityID,
      barangayID: this.addressForm.value.barangayID,
      zipcode: this.addressForm.value.zipcode,
      street: this.addressForm.value.street,
      mobileNo: this.addressForm.value.mobileNo.number,
      email: this.addressForm.value.email,

      ofwForeignAddress: this.addressForm.value.ofwForeignAddress,
      ofwCountry: this.addressForm.value.ofwCountry,
      ofwContactNo: this.addressForm.value.ofwContactNo.number,

      // educationalAttainment: this.participantProfileForm.value.educationalAttainment,
      // course: this.participantProfileForm.value.course,
      // addressID: this.participantProfileForm.value.addressID,
      // employmentDetailsID: this.participantProfileForm.value.employmentDetailsID,
      // tags: this.participantProfileForm.value.tags,
    };
    if (this.user) {
      if (address.id) {
        this.userDetails.updateAddress(address).subscribe((response) => {
          if (response) {
            // this.showToast('Address saved success', 'Success', 'success');
            console.log(response);
          }
        });
      } else {
        this.userDetails.saveAddress(address).subscribe((response) => {
          if (response) {
            // this.showToast('Saved Success', 'Success', 'success');
            console.log(response);
          }
        });
      }
    }
  }
  navigateTo(link: any) {
    this.router.navigate([link]);
  }

  onSelectRegion(event: any) {
    const regiondID = event.target.value;
    // Fetch provinces
    this.locationService.getProvinces(regiondID).subscribe((data) => {
      this.provinces = data;
    });
  }

  onProvinceChange(event: any) {
    // Fetch cities based on selected province
    const provinceId = event.target.value;
    this.locationService.getCities(provinceId).subscribe((data) => {
      this.cities = data;
    });
  }

  onCityChange(event: any) {
    // Fetch barangays based on selected city
    const cityId = event.target.value;
    const selectedCity = this.cities.find((city) => city.code === cityId) || {};
    const payload = {
      cityCode: selectedCity.isCity === 1 ? cityId : '',
      municipalityCode: selectedCity.isMunicipality === 1 ? cityId : '',
    };

    this.locationService.getBarangays(payload).subscribe((data) => {
      this.barangays = data;
    });
  }
}
