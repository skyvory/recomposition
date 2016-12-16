import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HomeModule } from './+home/home.module';
import { SettingModule } from './+setting/setting.module';
import { AssessmentModule } from './+assessment/assessment.module';

import { AuthenticationService } from './authentication.service';
import { VnService } from './vn.service';
import { DeveloperService } from './developer.service';
import { VndbService } from './vndb.service';
import { AssessmentService } from './assessment.service';
import { CharacterService } from './character.service';
import { LineamentService } from './lineament.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';
// import { VnComponent } from './vn.component';
// import { VnFillComponent } from './vn-fill.component';
// import { VnAssessmentComponent } from './vn-assessment.component';
// import { VnCharacterComponent } from './+vn-character/vn-character.component';
import { SearchComponent } from './+search/search.component';

import './rxjs-extensions';

import { AUTH_PROVIDERS } from 'angular2-jwt';
// for angular2-jwt configuration
import { provideAuth } from 'angular2-jwt';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		HomeModule,
		MaterialModule.forRoot(),
		Ng2PaginationModule,
		SettingModule,
		AssessmentModule
	],
	declarations: [
		AppComponent,
		LoginComponent,
		// VnComponent,
		// VnFillComponent,
		// VnAssessmentComponent,
		// VnCharacterComponent,
		SearchComponent
	],
	providers: [
		AUTH_PROVIDERS,
		AuthGuard,
		AuthenticationService,
		VnService,
		DeveloperService,
		VndbService,
		AssessmentService,
		provideAuth({
			tokenName: "recomposition_token",
			noJwtError: false,
		}),
		CharacterService,
		LineamentService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}