import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { SettingWrapperComponent } from './setting-wrapper/setting-wrapper.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'setting', component: SettingWrapperComponent
			// path: '',
			// children: [
			// 	{ path: 'setting',
			// 	component: SettingWrapperComponent}
			// ]
		}

	])],
	exports: [RouterModule]
})
export class SettingRoutingModule {}