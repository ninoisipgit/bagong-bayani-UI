import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss'],
})
export class ResumeBuilderComponent {
  apiUrl = `${environment.apiUrl}/api/auth`;
  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  pdfData: any = null;

  onExportResume() {
    this.http
      .get(`${this.apiUrl}/reports/generateResume/${this.user._id}`, {
        responseType: 'blob',
      })
      .subscribe(
        (blob: Blob) => {
          const file = new Blob([blob], { type: 'application/pdf' });
          this.pdfData = URL.createObjectURL(file);
          console.log('report', this.pdfData);
          window.open(this.pdfData, '_blank');
          this.router.navigate(['/main/personal-details']);
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
