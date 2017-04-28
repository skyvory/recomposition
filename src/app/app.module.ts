import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HomeModule } from './+home/home.module';
import { SettingModule } from './+setting/setting.module';
import { AssessmentModule } from './+assessment/assessment.module';
import { VnModule } from './vn/vn.module';

import { AuthenticationService } from './authentication.service';
import { VnService } from './vn.service';
import { DeveloperService } from './developer.service';
import { VndbService } from './vndb.service';
import { AssessmentService } from './assessment.service';
import { CharacterService } from './character.service';
import { LineamentService } from './lineament.service';
import { ActiveService } from './active.service';
import { FileUploadService } from './file-upload.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginModule } from './login/login.module';
// import { VnComponent } from './vn.component';
// import { VnFillComponent } from './vn-fill.component';
// import { VnAssessmentComponent } from './vn-assessment.component';
// import { VnCharacterComponent } from './+vn-character/vn-character.component';
import { SearchComponent } from './+search/search.component';

import './rxjs-extensions';

// import { AUTH_PROVIDERS } from 'angular2-jwt';
// for angular2-jwt configuration
// import { provideAuth } from 'angular2-jwt';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarsharedModule } from './sidebar/sidebar-shared.module';
import { ToastService } from './toaster/toast.service';
import { SettingService } from './setting.service';
import { ClipboardModule } from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffOnlyGuard } from './guards/staff-only.guard';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		HomeModule,
		MaterialModule,
		Ng2PaginationModule,
		SettingModule,
		AssessmentModule,
		VnModule,
		FlexLayoutModule,
		SidebarsharedModule,
		ClipboardModule,
		BrowserAnimationsModule,
		LoginModule
	],
	declarations: [
		AppComponent,
		// VnComponent,
		// VnFillComponent,
		// VnAssessmentComponent,
		// VnCharacterComponent,
		SearchComponent
	],
	providers: [
		// AUTH_PROVIDERS,
		AuthGuard,
		StaffOnlyGuard,
		AuthenticationService,
		VnService,
		DeveloperService,
		VndbService,
		AssessmentService,
		// provideAuth({
		// 	tokenName: "recomposition_token",
		// 	noJwtError: false,
		// }),
		CharacterService,
		LineamentService,
		ActiveService,
		FileUploadService,
		ToastService,
		SettingService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}