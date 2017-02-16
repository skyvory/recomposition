import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';

// import { LoginComponent } from './login.component';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
	title = "Recomposition";

	loading: boolean = true;

	constructor(
		private router: Router
	) {
		router.events.subscribe((event: RouterEvent) => {
			this.navigationInterceptor(event);
		});
	}

	navigationInterceptor(event: RouterEvent): void {
		if (event instanceof NavigationStart)
			this.loading = true;
		if (event instanceof NavigationEnd)
			this.loading = false;
		if (event instanceof NavigationCancel)
			this.loading = false;
		if (event instanceof NavigationError)
			this.loading = false;
	}
}