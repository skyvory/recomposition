import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { VnComponent } from './vn.component';
import { VnAssessmentComponent } from './vn-assessment.component';
import { VnCharacterComponent } from './+vn-character/vn-character.component';
import { VnFillComponent } from './vn-fill.component';
import { VnWrapperComponent } from './vn-wrapper/vn-wrapper.component';
import { VnAssessmentWrapperComponent } from './vn-assessment-wrapper/vn-assessment-wrapper.component';
import { CharacterWrapperComponent } from './character-wrapper/character-wrapper.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'vn',
			component: VnWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'vn/p/:page',
			component: VnComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'vn/:id/assessment',
			component: VnAssessmentWrapperComponent,
			canActivate: [AuthGuard],
		},
		{
			path: 'vn/:id/character',
			component: CharacterWrapperComponent,
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