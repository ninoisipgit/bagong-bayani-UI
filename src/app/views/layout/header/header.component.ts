import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  items = [
    { title: 'Home' },
    { title: 'Information' },
    { title: 'Resources' },
    { title: 'Contact' },
    { title: 'Login' },
  ];
  actions = [
    { icon: 'home-outline', label: 'Home', href: '/views' },
    {
      icon: 'browser-outline',
      label: 'Information',
      href: '/views/information',
    },
    { icon: 'file-text-outline', label: 'Resources', href: '/views/resources' },
    { icon: 'phone-outline', label: 'Contact', href: '/views/contact' },
    { icon: 'person-outline', label: 'Careers', href: '/views/login' },
  ];

  navigateto(link: string) {
    this.router.navigate([link]);
  }
}
