import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class VndbService {
	constructor(
		private authenticationService: AuthenticationService,
		private http: HttpClient
	) { }

	getVndbVn(vndb_vn_id: number, vndb_username_hash: string, vndb_password_hash: string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			vndb_username_hash: vndb_username_hash,
			vndb_password_hash: vndb_password_hash
		});
		console.log(data);

		return this.http.post(Constant.API_PATH + `vndb/vn`, data, this.authenticationService.option)
			.map(
			(response: any) => {
				return response;
			},
			err => console.warn("map err", err)
			)
			.catch(this.handleError)
			;
	}

	getVndbRelease(vndb_vn_id: number, vndb_username_hash: string, vndb_password_hash: string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			vndb_username_hash: vndb_username_hash,
			vndb_password_hash: vndb_password_hash
		});

		return this.http.post(Constant.API_PATH + `vndb/release`, data, this.authenticationService.option)
			.map(
			(response: any) => {
				return response;
			},
			err => console.warn("map err", err)
			)
			.catch(this.handleError)
			;
	}

	setVote(vndb_vn_id: number, score_all: number): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			vote: score_all,
			vndb_username_hash: localStorage.getItem('vndb_user_hash'),
			vndb_password_hash: localStorage.getItem('vndb_pass_hash')
		});

		return this.http.post(Constant.API_PATH + `vndb/setVote`, data, this.authenticationService.option)
			.map(
			(response: any) => {
				return response;
			}
			)
			.catch(this.handleError)
			;
	}

	setStatus(vndb_vn_id: number, status: string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			status: status,
			vndb_username_hash: localStorage.getItem('vndb_user_hash'),
			vndb_password_hash: localStorage.getItem('vndb_pass_hash')
		});

		return this.http.post(Constant.API_PATH + `vndb/setStatus`, data, this.authenticationService.option)
			.map(
			(response: any) => {
				return response;
			}
			)
			.catch(this.handleError)
			;
	}

	getCharacters(vndb_vn_id: number, page: number): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			page: page,
			vndb_username_hash: localStorage.getItem('vndb_user_hash'),
			vndb_password_hash: localStorage.getItem('vndb_pass_hash')
		});

		return this.http.post(Constant.API_PATH + `vndb/character`, data, this.authenticationService.option)
			.map(
			(response: any) => {
				return response;
			}
			)
			.catch(this.handleError)
			;
	}

	private handleError(error: any) {
		console.error("Error occurred", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.error || error);
	}
}