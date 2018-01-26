import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { routing } from './app.routing';
import './rxjs-extensions';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MyMaterialModule } from './mymaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VnModule } from './vn/vn.module';

import { AuthenticationService } from './authentication.service';
import { VnService } from './vn.service';
import { DeveloperService } from './developer.service';
import { VndbService } from './vndb.service';
import { FileUploadService } from './file-upload.service';
import { AssessmentService } from './assessment.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    LoginModule,
    HomeModule,
    MyMaterialModule,
    FlexLayoutModule,
    VnModule
  ],
  providers: [
    AuthenticationService,
    VnService,
    DeveloperService,
    VndbService,
    FileUploadService,
    AssessmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
