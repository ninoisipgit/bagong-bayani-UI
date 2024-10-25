import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NbSidebarService,
  NbMenuService,
  NbThemeService,
  NbMediaBreakpointsService,
  NbDialogService,
} from '@nebular/theme';
import { Subject, takeUntil, map, Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  @Output() userData = new EventEmitter<any>();

  user: any; //User shoulkdd have a model

  private userSub: Subscription;

  userMenu!: any[];
  userDetails: any;
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
    private http: HttpClient,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private authService: AuthService,
    private menu: NbMenuService,
    private userDetailsService: UserDetailsService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        if (user._type == 1) {
          //company
          this.userMenu = [
            { title: 'Company Details', icon: 'book-outline' },
            { title: 'Manage Jobs', icon: 'briefcase-outline' },
            { title: 'Logout', icon: 'log-out-outline' },
          ];
        } else if (user._type == 2) {
          //ofw
          this.userMenu = [
            { title: 'Profile', icon: 'person-done-outline' },
            { title: 'Job Lists', icon: 'briefcase-outline' },
            { title: 'Logout', icon: 'log-out-outline' },
          ];
        } else if (user._type == 3) {
          //admin
          this.userMenu = [
            { title: 'Dashboard', icon: 'pie-chart-outline' },
            { title: 'News and events', icon: 'browser-outline' },
            { title: 'Manage Jobs', icon: 'briefcase-outline' },
            { title: "Manage Ofw's", icon: 'people-outline' },
            { title: 'Manage Companies', icon: 'grid-outline' },
            { title: 'Logout', icon: 'log-out-outline' },
          ];
        }

        this.userDetailsService
          .getPersonalDetailsByUserId(this.user._id)
          .subscribe((response: any) => {
            this.userDetails = response;
          });
      }
    });
  }

  ngOnInit(): void {
    this.menu.onItemClick().subscribe((title) => {
      if (title.item.title == 'Logout') {
        this.onLogout();
      }
      if (title.item.title == 'Profile') {
        this.router.navigate(['/main/personal-details']);
      }
      if (title.item.title == 'Company Details') {
        this.router.navigate(['/main/company-details']);
      }

      if (title.item.title == 'Manage Jobs') {
        this.router.navigate(['/main/manage-jobs-list']);
      }

      if (title.item.title == 'News and events') {
        this.router.navigate(['/main/events-management']);
      }

      if (title.item.title == 'Job Lists') {
        this.router.navigate(['/main/jobs']);
      }

      if (title.item.title == "Manage Ofw's") {
        this.router.navigate(['/main/ofw-list']);
      }

      if (title.item.title == 'Manage Companies') {
        this.router.navigate(['/main/company-list']);
      }
      if (title.item.title == 'Dashboard') {
        this.router.navigate(['/main/dashboard']);
      }
    });
  }

  async onLogout() {
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

  items = [
    { title: 'Home' },
    { title: 'Information' },
    { title: 'Resources' },
    { title: 'Contact' },
    { title: 'Login' },
  ];
  actions = [
    { icon: 'home-outline', label: 'Home', href: '/home' },
    { icon: 'browser-outline', label: 'Information', href: '/information' },
    { icon: 'file-text-outline', label: 'Resources', href: '/resources' },
    { icon: 'phone-outline', label: 'Contact', href: '/contact' },
    { icon: 'person-outline', label: 'Login', href: '/login' },
  ];

  navigateto(link: string) {
    this.router.navigate([link]);
  }
}
