import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router) { }

	canActivate() {
		if (tokenNotExpired('recomposition_token')) {
			return true;
		}

		alert('TOKEN IS EXPIRED');
		this.router.navigate(['/login']);
		return false;
	}

	canActivateChild() {
		if (tokenNotExpired('recomposition_token')) {
			return true;
		}

		alert('TOKEN IS EXPIRED');
		this.router.navigate(['/login']);
		return false;
	}
}