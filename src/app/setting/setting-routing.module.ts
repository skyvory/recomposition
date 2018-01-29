import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
// import { AuthGuard } from '../guards/auth.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{
			// path: 'setting', component: SettingWrapperComponent
			path: '',
			// canActivateChild: [
				// AuthGuard
			// ],
			children: [
				{
					path: '',
					component: SettingComponent
				},
				{
					path: 'more',
					component: SettingComponent
				}
			]
		}

	])],
	exports: [RouterModule]
})
export class SettingRoutingModule {}