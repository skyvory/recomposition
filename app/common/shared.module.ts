import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from '../app.routing';

@NgModule({
	imports: [
		CommonModule, routing
	],
	declarations: [
		//
	],
	exports: [
		CommonModule
	]
})

export class SharedModule {}