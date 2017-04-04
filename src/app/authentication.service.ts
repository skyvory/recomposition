import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { contentHeaders } from './common/headers';
// import 'rxjs/add/operator/toPromise';
import { Constant } from './const.config';

@Injectable()
export class AuthenticationService {
	public token: string;
	public authorization_bearer: string;

	constructor(private http: Http) {
		var currentUser = localStorage.getItem('recomposition_token');
		this.token = currentUser;
		this.authorization_bearer = 'Bearer ' + this.token;
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

	public optionParam(arg):any {
		return this.constructParamOptions(arg);
	}
	private constructParamOptions(params):any {
		let token = localStorage.getItem('recomposition_token');
		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + token);
		headers.append('Accept', 'application/json, text/plain');
		headers.append('Content-Type', 'application/json;charset=utf-8');
		let options = new RequestOptions({ headers: headers, search: params });
		return options;
	}

	public optionOnUpload:any = this.constructOptionsOnUpload();
	private constructOptionsOnUpload():any {
		let token = localStorage.getItem('recomposition_token');
		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + token);
		headers.append('Accept', 'application/json, text/plain');
		headers.append('Content-Type', 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2));
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
		return this.http.post(Constant.API_PATH + `authenticate`, body, {headers: contentHeaders })
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

	isJwtTokenValid():Observable<boolean> {
		let token = localStorage.getItem('recomposition_token');
		return this.http.get(Constant.API_PATH + 'authentication/validity', this.option)
			.map(
				(response:Response) => {
					if(response.json().user) {
						return true;
					}
					else {
						return false;
					}
				}
			)
			.catch(error => {
				if(error.json().error) {
					return Observable.throw(error.json().error);
				}
			});
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('recomposition_token');
	}
}