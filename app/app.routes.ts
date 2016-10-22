import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { VnComponent } from './vn.component';
import { AuthGuard } from './common/auth.guard';

const routes: RouterConfig = [
    // { path: '', component: HomeComponent, terminal: true },
    {
    	path: '',
    	redirectTo: '/vn',
    	pathMatch: 'full'
    },
    {
    	path: 'home',
    	component: HomeComponent,
		canActivate: [AuthGuard]
    },
    {
    	path: 'login',
    	component: LoginComponent
    },
	{
		path: 'vn',
		component: VnComponent,
	},
	{
		path: '**',
		component: LoginComponent
	},
];

export const appRouterProviders = [
	provideRouter(routes)
];