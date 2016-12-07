import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { VnComponent } from './vn.component';
import { VnAssessmentComponent } from './vn-assessment.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'vn',
			component: VnComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'vn/p/:page',
			component: VnComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'vn/:id/assessment',
			component: VnAssessmentComponent,
			canActivate: [AuthGuard],
		},
	])],
	exports: [RouterModule]
})
export class VnRoutingModule {}