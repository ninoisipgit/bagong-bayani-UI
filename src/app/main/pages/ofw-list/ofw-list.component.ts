import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ofw-list',
  templateUrl: './ofw-list.component.html',
  styleUrls: ['./ofw-list.component.scss'],
})
export class OfwListComponent implements OnInit {
  apiUrl = `${environment.apiUrl}/api/auth`;

  searchTerm: string = ''; // Bound to the search input
  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  List!: any[];
  filteredList: any[] = []; // List to display filtered jobs

  constructor(
    private jobService: JobService,
    private router: Router,
    private authService: AuthService,
    private userDetailsService: UserDetailsService,
    private http: HttpClient
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  filter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredList = this.List.filter(
      (row) =>
        row.FirstName?.toLowerCase().includes(term) ||
        row.LastName?.toLowerCase().includes(term) ||
        row.MiddleName?.toLowerCase().includes(term) ||
        row.suffix?.toLowerCase().includes(term) ||
        row.birthdate?.toLowerCase().includes(term) ||
        row.gender?.toLowerCase().includes(term) ||
        row.civilStatus?.toLowerCase().includes(term) ||
        row.religion?.toLowerCase().includes(term) ||
        row.educationalAttainment?.toLowerCase().includes(term) ||
        row.course?.toLowerCase().includes(term) ||
        row.tags?.toLowerCase().includes(term) ||
        row.passportNo?.toLowerCase().includes(term) ||
        row.cvPath?.toLowerCase().includes(term)
    );
  }

  fetchData() {
    if (this.isAuthenticated) {
      if (this.user._type == 3) {
        this.userDetailsService.getOfwList().subscribe((response) => {
          this.List = response;
          this.filteredList = response;
        });
      }
    }
  }
  pdfData: any = null;

  onExportReport() {
    this.http
      .get(`${this.apiUrl}/reports/OfwList`, { responseType: 'blob' })
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
