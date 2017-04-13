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


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
		MaterialModule.forRoot(),
		FlexLayoutModule,
		SidebarsharedModule
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