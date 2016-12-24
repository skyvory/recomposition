import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
// import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class VndbService {
	constructor(
		// public authHttp: AuthHttp,
		private authenticationService: AuthenticationService,
		private http: Http
	) {}

	getVndbVn(vndb_vn_id:number, username:string, password:string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			username: username,
			password: password
		});
		console.log(data);

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `vndb/vn`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		},
			// 		err => console.warn("map err", err)
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `vndb/vn`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					},
					err => console.warn("map err", err)
				)
				.catch(this.handleError)
			;
		}
	}

	getVndbRelease(vndb_vn_id:number, username:string, password:string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			username: username,
			password: password
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `vndb/release`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		},
			// 		err => console.warn("map err", err)
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `vndb/release`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					},
					err => console.warn("map err", err)
				)
				.catch(this.handleError)
			;
		}
	}

	setVote(vndb_vn_id:number, score_all:number):Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			vote: score_all,
			username: localStorage.getItem('vndb_user'),
			password: localStorage.getItem('vndb_pass')
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `vndb/setVote`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return  response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `vndb/setVote`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return  response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	setStatus(vndb_vn_id:number, status:string):Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			status: status,
			username: localStorage.getItem('vndb_user'),
			password: localStorage.getItem('vndb_pass')
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `vndb/setStatus`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `vndb/setStatus`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	getCharacters(vndb_vn_id:number, page:number):Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			page: page,
			username: localStorage.getItem('vndb_user'),
			password: localStorage.getItem('vndb_pass')
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `vndb/character`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `vndb/character`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}


	private handleError(error: any) {
		console.error("Error occurred", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}