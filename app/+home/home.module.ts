import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { MaterialModule } from '@angular/material';

@NgModule({
	imports: [
		MaterialModule.forRoot(),
	],
	declarations: [
		HomeComponent
	],
	providers: [],
	exports: [
		HomeComponent
	]
})

export class HomeModule {}