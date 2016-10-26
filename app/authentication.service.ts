import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { contentHeaders } from './common/headers';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
	public token: string;

	constructor(private http: Http) {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;
	}

	// private headers = new Headers({'Content-Type': 'application/json'});


	login(username, password): Observable<boolean> {
		// return this.http.post('http://localhost/record/public/api/authenticate', JSON.stringify({username:username, password:password}), {headers: this.headers})
		// .toPromise()
		// .then(response => {
		// 	console.log(response);
		// });
		let body = JSON.stringify({ username: username, password: password });
		return this.http.post('http://localhost/record/public/api/authenticate', body, {headers: contentHeaders })
			.map((response: Response) => {
				console.log(response);
				let token = response.json() && response.json().token;
				if(token) {
					this.token = token;

					localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

					return true;
				} else {
					return false;
				}
			});
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('currentUser');
	}
}