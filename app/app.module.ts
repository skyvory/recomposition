import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { VnService } from './vn.service';
import { AuthenticationService } from './authentication.service';
// import { DeveloperService } from './developer.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { VnComponent } from './vn.component';


import './rxjs-extensions';

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
		AuthGuard,
		AuthenticationService,
		VnService,
		// DeveloperService,
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}