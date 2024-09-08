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

@NgModule({
  declarations: [
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
    NbToastrModule.forRoot(),
  ],
})
export class MainModule {}
