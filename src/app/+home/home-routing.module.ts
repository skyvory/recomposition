import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'home', component: HomeWrapperComponent
		}
	])],
	exports: [RouterModule]
})
export class HomeRoutingModule {}