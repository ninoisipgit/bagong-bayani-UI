import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService, NbMenuService, NbThemeService, NbMediaBreakpointsService, NbDialogService } from '@nebular/theme';
import { Subject, takeUntil, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  @Output() userData = new EventEmitter<any>();

  user : any;
  userOrganization:any;


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
    private menu: NbMenuService)
    {
        // this.menu.onItemClick().subscribe(res => {
        //     const selected = res.item.title;
        //     if(selected == 'Log out'){
        //       this.onLogout();
        //     }

        // });
    }

  ngOnInit(): void {



  }

  onMenuItemClick(event:any) {
    if (event === 'Logout') {
      // this.authService.logout('email').subscribe(() => {
      //   // Redirect to the login page or perform any other necessary actions
      //   window.location.href = '/auth/login';
      // });
    }
  }



  async onLogout(){
    // await this.authService.logout();
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
