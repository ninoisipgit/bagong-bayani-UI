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
  NbStepperModule,
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
import { LineChartComponent } from './pages/dashboard/line-chart/line-chart.component';
import { BarChartComponent } from './pages/dashboard/bar-chart/bar-chart.component';
import { BarChartToppaidComponent } from './pages/dashboard/bar-chart-toppaid/bar-chart-toppaid.component';
import { ResumeBuilderComponent } from './pages/resume-builder/resume-builder.component';
import { PersonalInfoComponent } from './pages/resume-builder/personal-info/personal-info.component';
import { WorkExperienceComponent } from './pages/resume-builder/work-experience/work-experience.component';
import { EducationComponent } from './pages/resume-builder/education/education.component';
import { SkillsComponent } from './pages/resume-builder/skills/skills.component';
import { ReferencesComponent } from './pages/resume-builder/references/references.component';
import { ResumePreviewComponent } from './pages/resume-builder/resume-preview/resume-preview.component';

import { AddWorkExperienceComponent } from './pages/resume-builder/work-experience/add-work-experience/add-work-experience.component';
import { AddEducationComponent } from './pages/resume-builder/education/add-education/add-education.component';
import { CertificationsComponent } from './pages/resume-builder/certifications/certifications.component';
import { AddCertificationsComponent } from './pages/resume-builder/certifications/add-certifications/add-certifications.component';
import { AddReferenceComponent } from './pages/resume-builder/references/add-reference/add-reference.component';
import { ConfirmDialogComponent } from './pages/resume-builder/confirm-dialog/confirm-dialog.component';

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
    LineChartComponent,
    BarChartComponent,
    BarChartToppaidComponent,
    ResumeBuilderComponent,
    PersonalInfoComponent,
    WorkExperienceComponent,
    EducationComponent,
    SkillsComponent,
    CertificationsComponent,
    ReferencesComponent,
    ResumePreviewComponent,
    AddWorkExperienceComponent,
    AddEducationComponent,
    AddCertificationsComponent,
    AddReferenceComponent,
    ConfirmDialogComponent,
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
    NbStepperModule,
  ],
})
export class MainModule {}
