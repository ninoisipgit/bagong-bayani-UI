import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ManageJobsComponent } from './pages/manage-jobs/manage-jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { HeaderComponent } from '../layout/header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    JobsComponent,
    ManageJobsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    HttpClientModule,
    NbInputModule
  ]
})
export class MainModule { }
