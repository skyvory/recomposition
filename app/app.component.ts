import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';

// import { LoginComponent } from './login.component';

@Component({
	selector: 'my-app',
	template: `
		<nav>
		<a routerLink="/home" routerLinkActive="active">Home</a>
		<a routerLink="/vn" routerLinkActive="active">Fin</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	// directives: [ROUTER_DIRECTIVES]
})

export class AppComponent{
	title = "Recomposition";
}