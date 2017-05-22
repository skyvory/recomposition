import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import './rxjs-extensions';
import { StaffOnlyGuard } from './guards/staff-only.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from 'ngx-clipboard';

import { LoginModule } from './login/login.module';
import { HomeModule } from './+home/home.module';
import { SettingModule } from './+setting/setting.module';
import { AssessmentModule } from './+assessment/assessment.module';
import { VnModule } from './vn/vn.module';
import { SidebarsharedModule } from './sidebar/sidebar-shared.module';

import { AuthenticationService } from './authentication.service';
import { VnService } from './vn.service';
import { DeveloperService } from './developer.service';
import { VndbService } from './vndb.service';
import { AssessmentService } from './assessment.service';
import { CharacterService } from './character.service';
import { LineamentService } from './lineament.service';
import { ActiveService } from './active.service';
import { FileUploadService } from './file-upload.service';
import { ToastService } from './toaster/toast.service';
import { SettingService } from './setting.service';
import { TwitterService } from './twitter.service';

import { SearchComponent } from './+search/search.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		Ng2PaginationModule,
		LoginModule,
		SidebarsharedModule,
		HomeModule,
		VnModule,
		AssessmentModule,
		SettingModule,
		ClipboardModule
	],
	declarations: [
		AppComponent,
		SearchComponent
	],
	providers: [
		AuthGuard,
		StaffOnlyGuard,
		AuthenticationService,
		VnService,
		DeveloperService,
		VndbService,
		AssessmentService,
		CharacterService,
		LineamentService,
		ActiveService,
		FileUploadService,
		SettingService,
		ToastService,
		TwitterService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}