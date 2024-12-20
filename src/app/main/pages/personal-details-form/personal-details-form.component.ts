import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { UserProfile } from 'src/app/shared/models/user-profile';
import { JobService } from 'src/app/shared/services/job.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { EmailData } from 'src/app/shared/models/job-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss'],
})
export class PersonalDetailsFormComponent implements OnInit {
  CountryISO = CountryISO; // Assign the enum to a public variable
  SearchCountryField = SearchCountryField;
  participantProfileForm!: FormGroup;
  cvFile: File | null = null; // Variable to hold the file
  CVPreview: any = null;
  addressForm!: FormGroup;
  employmentForm!: FormGroup;
  jobApplicant!: any;
  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  salaryRanges: string[] = [];
  countries: any[] = [];
  regions: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  barangays: any[] = [];

  selectedCountry = '';
  selectedRegion = '';
  selectedProvince = '';
  selectedCity = '';
  selectedBarangay = '';
  readonly: boolean = false;
  personID: number = 0;
  jobID: number = 0;
  apiUrl = `${environment.apiUrl}/api/auth`;
  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private userDetails: UserDetailsService,
    private jobService: JobService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient
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

      tags: [''],
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
      religion: ['', Validators.required],
      education: ['', Validators.required],
      course: ['', Validators.required],
      ofwForeignAddress: ['', Validators.required],
      ofwCountry: ['', Validators.required],
      ofwContactNo: ['', Validators.required],
    });

    this.employmentForm = this.fb.group({
      // Employment Details
      id: [0],
      employerName: ['', Validators.required],
      personID: ['', Validators.required],
      vessel: ['', Validators.required],
      occupation: ['', Validators.required],
      monthlySalary: ['', Validators.required],
      agencyName: [''],
      contractDuration: ['', Validators.required],
      ofwType: ['', Validators.required],
      jobSite: ['', Validators.required],
      currency: ['', Validators.required],
      // employeraddress: ['', Validators.required],
      // employercontactno: [''],
      // salarycurrency: ['']
      coe_attachment: ['', Validators.required], //status,
      passport_attachment: ['', Validators.required], //year contract finished,
    });

    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.personID = user?._id;
        this.isAuthenticated = !!user;
        if (this.user._type == 1) {
          this.readonly = true;
          this.route.paramMap.subscribe((params) => {
            this.personID = Number(params.get('userId'));
            this.jobID = Number(params.get('jobID'));
          });
          this.getApplicantsList();
        }
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
    this.userDetails
      .getPersonalDetailsByUserId(this.personID)
      .subscribe((response) => {
        if (response) {
          const skills = response.tags?.split(',').map((item: string) => {
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
            suffix: response.suffix,
            birthdate: date.toISOString().split('T')[0],
            gender: response.gender,
            civilstatus: response.civilStatus,
            passportNo: response.passportNo,
            tags: skills,
          });
          this.CVPreview = response.cvPath;
        }
      });

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

    this.userDetails
      .getEmploymentDetailsByUserId(this.personID)
      .subscribe((response) => {
        if (response.length > 0) {
          const str = response[0].monthlySalary;
          const parts = str.split('%');
          this.employmentForm.patchValue({
            personId: this.personID,
            id: response[0].id,
            employerName: response[0].employerName,
            vessel: response[0].vessel,
            occupation: response[0].occupation,
            currency: parts[0],
            monthlySalary: parts[1],
            coe_attachment: response[0].coe_attachment,
            passport_attachment: response[0].passport_attachment,
            agencyName: response[0].agencyName,
            contractDuration: response[0].contractDuration,
            ofwType: response[0].ofwType,
            jobSite: response[0].jobSite,
            status: response[0].status,
          });
        }
      });

    // Fetch countries
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

    this.generateSalaryRanges();
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

  isBarangayDisabled() {
    return !this.addressForm.get('cityID')?.value; // Disable if cityID is null or empty
  }
  generateSalaryRanges() {
    const step = 10000;
    const max = 100000;
    for (let i = 10000; i < max; i += step) {
      const range = `${i.toLocaleString()} - ${(i + step).toLocaleString()}`;
      this.salaryRanges.push(range);
    }
  }

  onStatusChange(applicant: any, event: string): void {
    if (applicant) {
      const application = {
        id: applicant.id,
        jobID: applicant.jobID,
        appliedUserID: applicant.appliedUserID,
        status: event,
      };
      this.jobService.applyForJob(application).subscribe((res: any) => {
        if (res) {
          this.showToast(
            'Application submitted successfully!',
            'Success',
            'success'
          );
        }
      });
      let body = 'your application status has been changed to ' + event + '.';
      if (event == 'declined') {
        body =
          'we regret to inform you that you have been declined from this job. Kindly apply for a different job.';
      }
      if (event == 'withdrawn') {
        body = 'you withdrawn from this job application';
      }
      if (event == 'hired') {
        body =
          'Congratulations! You have been hired for this job. Please check your email for more details.';
      }
      const emailData: EmailData = {
        to: this.addressForm.controls['email'].value,
        from: this.user._email,
        subject: 'Job application Update',
        body: `
            <p>Hello,</p>
            <p>I hope this message finds you well.</p>
            <p>${body}</p>
            <p>If you have any questions or need further clarification, feel free to reach out.</p>
            <p>Best regards</p>
      `,
      };
      this.authService.sendEmail(emailData).subscribe((response) => {
        if (response)
          this.showToast('Email Sent successfully!', 'Success', 'success');
      });
    }
  }

  onSubmitPersonalDetails(): void {
    const tagsValue = this.participantProfileForm.value.tags;
    const skills: string = Array.isArray(tagsValue)
      ? tagsValue.map((obj: { value: string }) => obj.value).join(', ')
      : tagsValue || '';

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

      // Append the cvFile if it exists
      if (this.cvFile) {
        formData.append('cvPath', this.cvFile, this.cvFile.name);
      }

      // Now send the formData
      this.userDetails.savePersonalDetails(formData).subscribe((response) => {
        if (response) {
          this.showToast('submitted successfully!', 'Success', 'success');
          console.log(response);
        }
      });
    }
  }

  onSubmitAddress(): void {
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
            this.showToast('submitted successfully!', 'Success', 'success');
            console.log(response);
          }
        });
      } else {
        this.userDetails.saveAddress(address).subscribe((response) => {
          if (response) {
            this.showToast('submitted successfully!', 'Success', 'success');
            console.log(response);
          }
        });
      }
    }
  }

  showToast(message: string, title: string, status: string) {
    this.toastrService.show('Form submitted successfully!', title, { status });
  }

  isInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    return control !== null && control !== undefined && control.invalid;
  }

  onSubmitEmploymentDetails(): void {
    const value: any = {
      personID: this.user._id,
      id: this.employmentForm.value.id,
      employerName: this.employmentForm.value.employerName,
      vessel: this.employmentForm.value.vessel,
      occupation: this.employmentForm.value.occupation,
      monthlySalary:
        this.employmentForm.value.currency +
        '%' +
        this.employmentForm.value.monthlySalary,
      agencyName: this.employmentForm.value.agencyName,
      contractDuration: this.employmentForm.value.contractDuration,
      ofwType: this.employmentForm.value.ofwType,
      jobSite: this.employmentForm.value.jobSite,
      status: this.employmentForm.value.status,
      coe_attachment: this.employmentForm.value.coe_attachment,
      passport_attachment: this.employmentForm.value.passport_attachment,

      // educationalAttainment: this.participantProfileForm.value.educationalAttainment,
      // course: this.participantProfileForm.value.course,
      // addressID: this.participantProfileForm.value.addressID,
      // employmentDetailsID: this.participantProfileForm.value.employmentDetailsID,
      // tags: this.participantProfileForm.value.tags,
    };
    if (this.user) {
      if (value.id) {
        this.userDetails
          .updateEmploymentDetails(value)
          .subscribe((response) => {
            if (response) {
              this.showToast('submitted successfully!', 'Success', 'success');
              console.log(response);
            }
          });
      } else {
        this.userDetails.saveEmploymentDetails(value).subscribe((response) => {
          if (response) {
            this.showToast('submitted successfully!', 'Success', 'success');
            console.log(response);
          }
        });
      }
    }
  }
  navigateTo(link: any) {
    this.router.navigate([link]);
  }
  submitAll() {
    this.onSubmitPersonalDetails();
    this.onSubmitAddress();
    // this.onSubmitEmploymentDetails();
  }

  getCities(provinceId: any) {
    this.locationService.getCities(provinceId).subscribe((response) => {
      this.cities = response;
    });
  }

  getApplicantsList() {
    this.jobService.getJobApplicants().subscribe((res: any) => {
      this.jobApplicant = res.find(
        (x: any) => x.jobID == this.jobID && x.appliedUserID == this.personID
      );
    });
  }

  // // Method to handle file input
  // onFileChange(event: any) {
  //   const file = event.target.files[0]; // Get the first file
  //   if (file) {
  //     this.cvFile = file; // Store the file reference
  //   }
  // }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cvFile = input.files[0];

      // Create a URL for previewing the file
      this.CVPreview = URL.createObjectURL(this.cvFile);
    }
  }

  getIframeSrc(url: string): SafeResourceUrl {
    // If the URL is a PDF
    if (url.endsWith('.pdf')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    // For Word documents, you can convert them to PDF or provide a link to download
    // Word documents can't be displayed directly in an iframe, but you can provide a message or a download option.
    return this.sanitizer.bypassSecurityTrustResourceUrl(''); // Return empty for unsupported formats
  }

  pdfData: any = null;

  onExportResume() {
    this.http
      .get(`${this.apiUrl}/reports/generateResume/${this.personID}`, {
        responseType: 'blob',
      })
      .subscribe(
        (blob: Blob) => {
          const file = new Blob([blob], { type: 'application/pdf' });
          this.pdfData = URL.createObjectURL(file);
          console.log('report', this.pdfData);
          window.open(this.pdfData, '_blank');

          // // Create a link element
          // const link = document.createElement('a');
          // link.href = this.pdfData;
          // link.download = 'file.pdf'; // Set the desired file name

          // // Append the link to the body
          // document.body.appendChild(link);

          // // Trigger the download
          // link.click();

          // // Clean up and remove the link
          // document.body.removeChild(link);
          // URL.revokeObjectURL(this.pdfData); // Free up memory
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
