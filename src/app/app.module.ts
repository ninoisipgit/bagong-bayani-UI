import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbInputModule,
  NbSearchModule,
  NbMenuModule,
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,
  NbSelectModule,
  NbUserModule,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './main/layout/header/header.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FooterComponent } from './main/layout/footer/footer.component';
@NgModule({
  declarations: [AppComponent, AuthComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    HttpClientModule,
    NbInputModule,
    NbMenuModule.forRoot(), // This provides the NbMenuService
    NbActionsModule,
    NbContextMenuModule,
    NbSelectModule,
    NbIconModule,
    NbUserModule,
    NbDialogModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
