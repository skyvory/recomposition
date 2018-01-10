import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    // MaterialModule,
    BrowserAnimationsModule,
    // FlexLayoutModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
