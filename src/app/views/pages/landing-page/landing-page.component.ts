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

  faqs = [
    {
      question: 'Q. How can I be a member of OWWA?',
      answer:
        'Since OWWA is a membership institution, there is a membership contribution worth USD $25.00. This entitles the members to various benefits from OWWA’s programs and services.',
      list: [
        'Enrollment upon processing of contract at the POEA',
        'Voluntary registration of a would-be member at job sites overseas',
      ],
    },
    {
      question: 'Q. What are the benefits of becoming an OWWA member?',
      answer:
        'OWWA members are entitled to an array of Social Benefits, Education & Training, Repatriation and Reintegration Services. They are also entitled to special programs.',
    },
    {
      question: 'Q. When should I renew my OWWA membership?',
      answer:
        'The validity for each contribution is two (2) years, regardless of contract duration, change of employer, jobsite or recruitment agency. Thereafter, OWWA membership shall be renewed, provided there is proof of active employment.',
    },
    {
      question: 'Q. How do I renew my OWWA membership?',
      answer: 'You may renew your OWWA membership by:',
      list: [
        'OWWA Mobile App – You may renew your membership via Mobile App by following our step-by-step guide',
        'Overseas Jobsites – OFWs may renew their membership on select sites and events on your jobsite/host country. You may check the OWWA Directory if available',
        'If OFW is abroad, they may ask their NOK or relatives to renew at the nearest Regional Welfare Office in their area.',
      ],
    },
  ];
}
