import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';
// import { HomeComponent } from './+home/home.component';
import { VnComponent } from './vn.component';
import { VnFillComponent } from './vn-fill.component';
import { VnAssessmentComponent } from './vn-assessment.component';
import { VnCharacterComponent } from './+vn-character/vn-character.component';
import { SearchComponent } from './+search/search.component';

const appRoutes: Routes = [
	// { path: '', component: HomeComponent, terminal: true },
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadChildren: 'app/+home/home.module#HomeModule',
		// component: HomeComponent,
		// canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'vn',
		component: VnComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'vn/:page',
		component: VnComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'vn/new',
		component: VnFillComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'vn/:id/assessment',
		component: VnAssessmentComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'vn/:id/edit',
		component: VnFillComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'vn/:id/character',
		component: VnCharacterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'search/:query',
		component: SearchComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'search/:query/:page',
		component: SearchComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '**',
		redirectTo: '/vn',
	},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);