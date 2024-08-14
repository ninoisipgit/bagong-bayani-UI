import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService, NbMenuService, NbThemeService, NbMediaBreakpointsService, NbDialogService } from '@nebular/theme';
import { Subject, takeUntil, map, Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  @Output() userData = new EventEmitter<any>();

  user : any;//User shoulkdd have a model

  private userSub: Subscription;


  userMenu = [{ title: 'Profile' }, { title: 'Logout', icon: 'log-out-outline' }];

  currentTheme = 'default';
  isExpanded = false;


  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  constructor(
    private router: Router,
    private http : HttpClient,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private authService : AuthService,
    private menu: NbMenuService)
    {
      this.userSub = this.authService.user.subscribe(user => {
        this.user = user;
        this.isAuthenticated = !!user;
        if(this.isAuthenticated){

          // this.getUserProfile();
          // this.getOrganizations();
          // this.authService.getUserOrganization().subscribe((response:UserOrganization) => {
          //   this.userOrganization = response;
          // });
          // this.goalSettingService.updateOrganization.subscribe(() => {
          //   this.userOrganization = JSON.parse(localStorage.getItem('userOrganization'));
          // });
        }
      });
    }

  ngOnInit(): void {


    this.menu.onItemClick()
    .subscribe(title => {
      if(title.item.title == 'Logout'){
        this.onLogout();
      }
    });
  }


  async onLogout(){
    await this.authService.logout();
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();
    return false;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


}
