import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  searchTerm: string = ''; // Bound to the search input
  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  List!:any[];
  filteredList: any[] = []; // List to display filtered jobs

  constructor(
    private jobService: JobService,
    private router:Router,
    private authService: AuthService,
    private userDetailsService:UserDetailsService){
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
   }

  ngOnInit(): void {
    this.fetchData();
  }

  filter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredList = this.List.filter(row =>
      row.companyName?.toLowerCase().includes(term) ||
      row.companyType?.toLowerCase().includes(term) ||
      row.same_as?.toLowerCase().includes(term) ||
      row.logo?.toLowerCase().includes(term) ||
      row.industry?.toLowerCase().includes(term) ||
      row.description?.toLowerCase().includes(term) ||
      row.mission?.toLowerCase().includes(term) ||
      row.vision?.toLowerCase().includes(term) ||
      row.address?.toLowerCase().includes(term)
    );
  }

  fetchData(){
    if(this.isAuthenticated){
      if(this.user._type == 3){
        this.userDetailsService.getEmployersList().subscribe((response) => {
          this.List = response;
          this.filteredList = response;
        });
      }
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

}
