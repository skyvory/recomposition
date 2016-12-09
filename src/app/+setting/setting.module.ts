import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingWrapperComponent } from './setting-wrapper/setting-wrapper.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SettingRoutingModule,
		MaterialModule.forRoot()
	],
	declarations: [SettingComponent, SettingWrapperComponent]
})
export class SettingModule { }
