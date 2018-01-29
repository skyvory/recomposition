import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from './guards/auth.guard';
// import { SearchComponent } from './+search/search.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadChildren: 'app/home/home.module#HomeModule',
	},
	{
		path: 'assessment',
		loadChildren: 'app/assessment/assessment.module#AssessmentModule',
	},
	{
		path: 'vn',
		loadChildren: 'app/vn/vn.module'
	},
	// {
	// 	path: 'search/:query',
	// 	component: SearchComponent,
	// 	canActivate: [AuthGuard]
	// },
	// {
	// 	path: 'search/:query/:page',
	// 	component: SearchComponent,
	// 	canActivate: [AuthGuard]
	// },
	{
		path: 'setting',
		loadChildren: 'app/setting/setting.module#SettingModule'
	},
	{
		path: '**',
		redirectTo: '/home',
	},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);