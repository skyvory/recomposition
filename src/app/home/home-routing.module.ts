import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
// import { AuthGuard } from '../guards/auth.guard';


@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'home', component: HomeComponent,
			// canActivate: [AuthGuard]
		}
	])],
	exports: [RouterModule]
})
export class HomeRoutingModule {}