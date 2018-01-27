import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from '../mymaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

@NgModule({
	imports: [
		CommonModule,
		// BrowserAnimationsModule,
		FormsModule,
		SettingRoutingModule,
		MyMaterialModule,
		FlexLayoutModule
	],
	declarations: [
		SettingComponent
	]
})
export class SettingModule { }
