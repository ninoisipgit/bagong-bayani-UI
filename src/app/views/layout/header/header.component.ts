import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: any
  ) {}

  ngOnInit() {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'header-context'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        // Find the action based on the title
        const clickedAction = this.actions.find(
          (action) => action.title === title
        );

        // If action is found, navigate or do something with the href
        if (clickedAction) {
          // this.window.location.href = clickedAction.href;
          this.router.navigate([clickedAction.href]);
        }
      });
  }

  actions = [
    { icon: 'home-outline', title: 'Home', href: '/views' },
    {
      icon: 'browser-outline',
      title: 'Information',
      href: '/views/information',
    },
    // { icon: 'file-text-outline', title: 'Resources', href: '/views/resources' },
    { icon: 'phone-outline', title: 'Contact', href: '/views/contact' },
    { icon: 'person-outline', title: 'Careers', href: '/views/login' },
  ];

  navigateto(link: string) {
    this.router.navigate([link]);
  }
}
