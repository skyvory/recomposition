import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingWrapperComponent } from './setting-wrapper/setting-wrapper.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarsharedModule } from '../sidebar/sidebar-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SettingRoutingModule,
		MaterialModule,
		FlexLayoutModule,
		SidebarsharedModule,
		BrowserAnimationsModule
	],
	declarations: [SettingComponent, SettingWrapperComponent]
})
export class SettingModule { }
