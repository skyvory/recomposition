import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { contentHeaders } from './common/headers';
import { Constant } from './const.config';
// import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
	public token: string;
	public authorization_bearer: string;

	constructor(private http: HttpClient) {
		var currentUser = localStorage.getItem('recomposition_token');
		this.token = currentUser;
		this.authorization_bearer = 'Bearer ' + this.token;
	}

	// private headers = new Headers({'Content-Type': 'application/json'});
	public user:any;

	public option:any = this.constructOptions();
	private constructOptions():any {
		let token = localStorage.getItem('recomposition_token');
		let headers = new HttpHeaders();
		headers = headers.append('Authorization', 'Bearer ' + token);
		headers = headers.append('Accept', 'application/json, text/plain');
		headers = headers.append('Content-Type', 'application/json;charset=utf-8');
		let options = {
			headers: headers
		};
		return options;
	}

	public optionParam(arg):any {
		return this.constructParamOptions(arg);
	}
	private constructParamOptions(params):any {
		let token = localStorage.getItem('recomposition_token');
		let headers = new HttpHeaders();
		headers = headers.append('Authorization', 'Bearer ' + token);
		headers = headers.append('Accept', 'application/json, text/plain');
		headers = headers.append('Content-Type', 'application/json;charset=utf-8');
		let options = {
			headers: headers,
			search: params
		};
		return options;
	}

	public optionOnUpload:any = this.constructOptionsOnUpload();
	private constructOptionsOnUpload():any {
		let token = localStorage.getItem('recomposition_token');
		let headers = new HttpHeaders();
		headers = headers.append('Authorization', 'Bearer ' + token);
		headers = headers.append('Accept', 'application/json, text/plain');
		headers = headers.append('Content-Type', 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2));
		let options = {
			headers: headers
		};
		return options;
	}

	login(username, password): Observable<boolean> {
		console.log(username, password);
		let body = JSON.stringify({ username: username, password: password });
		console.log(body);
		return this.http.post(Constant.API_PATH + `authenticate`, body, {headers: contentHeaders })
			.map((response:any) => {
				let token = response && response.token;
				if(token) {
					this.token = token;

					localStorage.setItem('recomposition_token', token);

					let user = response.user;
					localStorage.setItem('recomposition_user', JSON.stringify(user));
					this.user = user;

					return true;
				} else {
					return false;
				}
			});
		
	}

	isJwtTokenValid():Observable<boolean> {
		let token = localStorage.getItem('recomposition_token');
		console.log(token);
		return this.http.get(Constant.API_PATH + 'authentication/validity', this.option)
			.map(
				(response:any) => {
					if(response.user) {
						this.user = JSON.parse(localStorage.getItem('recomposition_user'));
						console.log(this.user);
						return true;
					}
					else {
						return false;
					}
				}
			)
			.catch(error => {
				if(error.error) {
					return Observable.throw(error.error);
				}
			});
	}

	isTokenReady():boolean {
		if(localStorage.getItem('recomposition_token')) {
			return true;
		}
		else {
			return false;
		}
	}

	logout(): boolean {
		this.token = null;
		localStorage.removeItem('recomposition_token');
		localStorage.removeItem('recomposition_user');
		return true;
	}

	activeUser():any {
		let savedUser = localStorage.getItem('recomposition_user');
		if(savedUser) {
			this.user = JSON.parse(savedUser);
			return this.user;
		}
		else {
			return null;
		}
	
	}
}