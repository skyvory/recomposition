import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { VnWrapperComponent } from './vn-wrapper/vn-wrapper.component';
import { VnFillComponent } from './vn-fill/vn-fill.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'vn',
			component: VnWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'vn/new',
			component: VnFillComponent,
			canActivate: [AuthGuard],
		},
		{
			path: 'vn/:id/edit',
			component: VnFillComponent,
			canActivate: [AuthGuard],
		},
	])],
	exports: [RouterModule]
})
export class VnRoutingModule {}