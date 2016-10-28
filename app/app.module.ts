import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AuthenticationService } from './authentication.service';
import { VnService } from './vn.service';
// import { DeveloperService } from './developer.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { VnComponent } from './vn.component';

import './rxjs-extensions';

import { AUTH_PROVIDERS } from 'angular2-jwt';
// for angular2-jwt configuration
import { provideAuth } from 'angular2-jwt';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
	],
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		VnComponent,
	],
	providers: [
		AUTH_PROVIDERS,
		AuthGuard,
		AuthenticationService,
		VnService,
		// DeveloperService,
		// provideAuth({
		// 	tokenName: "recomposition_token",
		// 	noJwtError: false,
		// }),
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}