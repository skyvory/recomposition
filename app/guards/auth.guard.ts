import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate() {
		if(tokenNotExpired('recomposition_token')) {
			// console.warn("TOKEN IS USABLE");
			return true;
		}
		// if(localStorage.getItem('recomposition_token')) {
		// 	return true;
		// }

		console.warn('TOKEN IS EXPIRED');
		this.router.navigate(['/login']);
		return false;
	}
}