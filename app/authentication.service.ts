import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { contentHeaders } from './common/headers';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
	public token: string;

	constructor(private http: Http) {
		var currentUser = localStorage.getItem('recomposition_token');
		this.token = currentUser;
	}

	// private headers = new Headers({'Content-Type': 'application/json'});

	public option:any = this.constructOptions();
	private constructOptions():any {
		// let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
		let token = localStorage.getItem('recomposition_token');
		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + token);
		headers.append('Accept', 'application/json, text/plain');
		headers.append('Content-Type', 'application/json;charset=utf-8');
		let options = new RequestOptions({ headers: headers });
		return options;
	} 

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

					localStorage.setItem('recomposition_token', token);

					return true;
				} else {
					return false;
				}
			});
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('recomposition_token');
	}
}