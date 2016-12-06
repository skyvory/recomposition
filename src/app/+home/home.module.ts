import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';

import { HomeComponent } from './home.component';
import { MaterialModule } from '@angular/material';
import { routing } from '../app.routing';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
		MaterialModule.forRoot(),
	],
	declarations: [
		HomeComponent
	],
	providers: [],
	// exports: [
	// 	HomeComponent
	// ]
})

export class HomeModule {}