import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';

import { HomeComponent } from './home.component';
import { routing } from '../app.routing';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
// import { SidebarsharedModule } from '../sidebar/sidebar-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from '../mymaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
		// SidebarsharedModule,
		BrowserAnimationsModule,
		MyMaterialModule,
		FlexLayoutModule
	],
	declarations: [
		HomeComponent
	],
	providers: [],
})

export class HomeModule {}