import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbRadioModule, NbToastrModule, NbFormFieldModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    NbRadioModule,
    NbToastrModule.forRoot(),
    NbFormFieldModule
  ]
})
export class AuthModule { }
