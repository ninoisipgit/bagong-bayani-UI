import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AuthGuard } from '../auth/auth.guard';
import { PersonalDetailsFormComponent } from './pages/personal-details-form/personal-details-form.component';
import { ManageJobsComponent } from './pages/manage-jobs/manage-jobs.component';
import { EmployerDetailsComponent } from './pages/employer-details/employer-details.component';
import { ManageJobsListComponent } from './pages/manage-jobs-list/manage-jobs-list.component';
import { EventsComponent } from './pages/events/events.component';
import { ManageApplicantsPerjobComponent } from './pages/manage-applicants-perjob/manage-applicants-perjob.component';
import { OfwListComponent } from './pages/ofw-list/ofw-list.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'manage-jobs-list',
        component: ManageJobsListComponent,
      },
      {
        path: 'manage-jobs',
        component: ManageJobsComponent,
      },
      {
        path: 'manage-jobs/:id',
        component: ManageJobsComponent,
      },
      {
        path: 'personal-details',
        component: PersonalDetailsFormComponent,
      },
      {
        path: 'personal-details-view/:userId/:jobID',
        component: PersonalDetailsFormComponent,
      },
      {
        path: 'company-details',
        component: EmployerDetailsComponent,
      },
      {
        path: 'events-management',
        component: EventsComponent,
      },
      {
        path: 'manage-applicants-perjob/:jobId',
        component: ManageApplicantsPerjobComponent,
      },
      {
        path: 'ofw-list',
        component: OfwListComponent,
      },
      {
        path: 'company-list',
        component: CompanyListComponent,
      },
      // {
      //   path: 'reset-password',
      //   component: ResetPasswordComponent,
      // },
    ],
  },
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
