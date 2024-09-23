import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { InformationComponent } from './pages/information/information.component';
import { ResourcesComponent } from './pages/resources/resources.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'information',
        component: InformationComponent,
      },
      {
        path: 'resources',
        component: ResourcesComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
