import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AuthGuard } from '../guards/auth.guard';

import { VnComponent } from './vn.component';
// import { VnFillComponent } from './vn-fill/vn-fill.component';
import { VnResolve } from '../vn.resolve';
// import { VnScreenshotComponent } from './vn-screenshot/vn-screenshot.component';
// import { StaffOnlyGuard } from '../guards/staff-only.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'vn',
			component: VnComponent,
			// canActivate: [AuthGuard],
			resolve: {
				vns: VnResolve
			}
		},
		// {
		// 	path: 'vn/new',
		// 	component: VnFillComponent,
		// 	// canActivate: [AuthGuard, StaffOnlyGuard],
		// },
		// {
		// 	path: 'vn/:id/edit',
		// 	component: VnFillComponent,
		// 	// canActivate: [AuthGuard, StaffOnlyGuard],
		// },
		// {
		// 	path: 'vn/:id/edit-screenshot',
		// 	component: VnScreenshotComponent,
		// 	// canActivate: [AuthGuard, StaffOnlyGuard]
		// }
	])],
	exports: [RouterModule]
})
export class VnRoutingModule { }