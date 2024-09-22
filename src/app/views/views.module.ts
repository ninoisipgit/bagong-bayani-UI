import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { InformationComponent } from './pages/information/information.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ViewsComponent } from './views.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbToastrModule,
  NbAlertModule,
  NbActionsModule,
} from '@nebular/theme';
import { TagInputModule } from 'ngx-chips';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ViewsRoutingModule } from './views-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InformationCardComponent } from './pages/information/information-card/information-card.component';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ViewsComponent,
    ContactUsComponent,
    InformationComponent,
    LandingPageComponent,
    ResourcesComponent,
    InformationCardComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ViewsRoutingModule,
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
    NbActionsModule,
    NgImageSliderModule,
  ],
})
export class ViewsModule {}
