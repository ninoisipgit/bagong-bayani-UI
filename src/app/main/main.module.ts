import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ManageJobsComponent } from './pages/manage-jobs/manage-jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbTagModule,
  NbAccordionModule,
  NbSelectModule,
  NbToastrModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbAlertModule,
  NbActionsModule,
  NbUserModule,
  NbDialogModule,
} from '@nebular/theme';
import { PersonalDetailsFormComponent } from './pages/personal-details-form/personal-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerDetailsComponent } from './pages/employer-details/employer-details.component';
import { ManageJobsListComponent } from './pages/manage-jobs-list/manage-jobs-list.component';
import { EventsComponent } from './pages/events/events.component';
import { EventModalComponent } from './pages/events/event-modal/event-modal.component';
import { UpdateEventModalComponent } from './pages/events/update-event-modal/update-event-modal.component';
import { AddEventModalComponent } from './pages/events/add-event-modal/add-event-modal.component';
import { PostCardComponent } from './pages/events/post-card/post-card.component';
import { ManageApplicantsPerjobComponent } from './pages/manage-applicants-perjob/manage-applicants-perjob.component';
import { TagInputModule } from 'ngx-chips';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HeaderComponent } from './layout/header/header.component';
import { ModalJobDetailsComponent } from './pages/jobs/modal-job-details/modal-job-details.component';
import { OfwListComponent } from './pages/ofw-list/ofw-list.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    JobsComponent,
    ManageJobsComponent,
    PersonalDetailsFormComponent,
    EmployerDetailsComponent,
    ManageJobsListComponent,
    EventsComponent,
    EventModalComponent,
    UpdateEventModalComponent,
    AddEventModalComponent,
    PostCardComponent,
    ManageApplicantsPerjobComponent,
    ModalJobDetailsComponent,
    OfwListComponent,
    CompanyListComponent,
    DashboardComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MainRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    HttpClientModule,
    NbInputModule,
    NbCardModule,
    NbTagModule,
    NbAccordionModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbContextMenuModule,
    NbIconModule,
    NbListModule,
    NbToastrModule.forRoot(),
    NbAlertModule,
    TagInputModule,
    NgxIntlTelInputModule,
    NbActionsModule,
    NbUserModule,
    NbDialogModule.forRoot(),
    NgChartsModule,
  ],
})
export class MainModule {}
