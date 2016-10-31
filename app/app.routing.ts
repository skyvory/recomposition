import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { VnComponent } from './vn.component';

const appRoutes: Routes = [
	// { path: '', component: HomeComponent, terminal: true },
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard],
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
		path: '**',
		redirectTo: '/login',
	},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);