import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  cards = [
    {
      icon: 'fa-regular fa-calendar icon-size',
      title: 'Appointment Scheduler',
      description: 'Secure your appointment schedule with us!',
    },
    {
      icon: 'fa-solid fa-pen-clip icon-size',
      title: 'OFW Assistance Information System',
      description: 'Let us assist you on your concerns. Register here.',
    },
    {
      icon: 'fa-solid fa-mobile-screen-button icon-size',
      title: 'Uwian Na Mobile App',
      description: 'To transport & accommodate OFWs home. Download now.',
    },
    {
      icon: 'fa-solid fa-magnifying-glass-location icon-size',
      title: 'OFW e-CARD Tracker',
      description: 'Check your e-Card status here.',
    },
    {
      icon: 'fa-regular fa-address-card icon-size',
      title: 'OFW e-CARD Application',
      description: 'Apply for OFW e-CARD now!',
    },
    {
      icon: 'fa-solid fa-money-bill-wave icon-size',
      title: 'OWWA Rebate Portal',
      description: 'Secure your appointment schedule with us!',
    },
  ];

  floatingCards = [
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'PDOEP',
      link: 'https://owwa.gov.ph/?page_id=4136',
    },
    {
      icon: 'fas fa-hospital',
      title: 'Social Benefits',
      link: 'https://owwa.gov.ph/?page_id=1431',
    },
    {
      icon: 'fas fa-book-reader',
      title: 'Education and Training',
      link: 'https://owwa.gov.ph/?page_id=1433',
    },
    {
      icon: 'fas fa-plane-arrival',
      title: 'Repatriation',
      link: 'https://owwa.gov.ph/?page_id=1435',
    },
    {
      icon: 'fa-solid fa-people-group',
      title: 'Reintegration',
      link: 'https://owwa.gov.ph/?page_id=1437',
    },
  ];
}
