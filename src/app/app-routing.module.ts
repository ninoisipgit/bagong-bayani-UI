import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './main/pages/public/landing-page/landing-page.component';
import { HomeComponent } from './main/pages/public/information/home/home.component';
import { InformationComponent } from './main/pages/public/information/information.component';
import { ResourcesComponent } from './main/pages/public/resources/resources.component';
import { ContactUsComponent } from './main/pages/public/contact-us/contact-us.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'information', component: InformationComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
