import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-ofw-list',
  templateUrl: './ofw-list.component.html',
  styleUrls: ['./ofw-list.component.scss']
})
export class OfwListComponent implements OnInit {
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

  fetchData(){
    if(this.isAuthenticated){
      if(this.user._type == 3){
        this.userDetailsService.getOfwList().subscribe((response) => {
          this.List = response;
          this.filteredList = response;
        });
      }
    }
  }


}
