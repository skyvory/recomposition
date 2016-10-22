import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { LoginComponent } from './login.component';

@Component({
	selector: 'my-app',
	template: `
	<h1>{{title}}</h1>
	<nav>
	<a [routerLink]="['/home']" routerLinkActive="active">Dashboard</a>
	<a [routerLink]="['/vn']" routerLinkActive="active">Vn</a>
	</nav>
	<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent{
	title = "Recomposition";
}