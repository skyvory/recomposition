import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';

import { HomeComponent } from './home.component';
import { MaterialModule } from '@angular/material';
import { routing } from '../app.routing';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarsharedModule } from '../sidebar/sidebar-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
		MaterialModule,
		FlexLayoutModule,
		SidebarsharedModule,
		BrowserAnimationsModule
	],
	declarations: [
		HomeComponent,
		HomeWrapperComponent
	],
	providers: [],
	// exports: [
	// 	HomeComponent
	// ]
})

export class HomeModule {}