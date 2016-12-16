import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AssessmentComponent } from './assessment.component';
import { AssessmentFillComponent } from './assessment-fill.component';
import { AssessmentCharacterComponent } from './assessment-character/assessment-character.component';
import { VnFillComponent } from './vn-fill.component';
import { AssessmentWrapperComponent } from './assessment-wrapper/assessment-wrapper.component';
import { AssessmentFillWrapperComponent } from './assessment-fill-wrapper/assessment-fill-wrapper.component';
import { AssessmentCharacterWrapperComponent } from './assessment-character-wrapper/assessment-character-wrapper.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'assessment',
			component: AssessmentWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'assessment/p/:page',
			component: AssessmentWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'assessment/:id/fill',
			component: AssessmentFillWrapperComponent,
			canActivate: [AuthGuard],
		},
		{
			path: 'assessment/:id/character',
			component: AssessmentCharacterWrapperComponent,
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