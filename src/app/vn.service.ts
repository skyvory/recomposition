import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { contentHeaders } from './common/headers';
// import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class VnService {
	constructor(
		// public authHttp: AuthHttp,
		private http: Http,
		private authenticationService: AuthenticationService
	) {}

	_vn:any = {};

	// todo: change static optional parameter into optional array. That way, the component doesn't have to throw undefined value as arguments
	getVns(limit:number = 10, page:number = 1, filter?:string):Observable<any> {
		if(typeof(limit) === 'undefined')
			limit = 10;
		if(typeof(page) === 'undefined')
			page = 1;
		if(typeof(filter) === 'undefined')
			filter = '';

		let params:URLSearchParams = new URLSearchParams();
		params.set('limit', limit.toString());
		params.set('page', page.toString());
		params.set('filter', filter.toString());

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.get(Constant.API_PATH + `vn`, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.get(Constant.API_PATH + `vn`, this.authenticationService.optionParam(params))
				.map(
					(response:Response) => response.json()
				)
			;
		}

	}

	getVn(vnId:number):Observable<any> {
		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.get(Constant.API_PATH + `vn/${vnId}`, {headers:contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			if(this._vn && Object.keys(this._vn).length > 0 && this._vn.data.id == vnId) {
				console.log("THISVN", this._vn);
				return Observable.of(this._vn).map(instantResponse => instantResponse);
			}
			else {
				return this.http.get(Constant.API_PATH + `vn/${vnId}`, this.authenticationService.option)
					.map(
						(response:Response) => {
							this._vn = response.json();
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
		}
	}

	createVn(vn:any):Observable<any> {
		let data = JSON.stringify({
			title_jp: vn.title_jp,
			title_en: vn.title_en,
			hashtag: vn.hashtag,
			developer_id: vn.developer_id,
			date_release: vn.date_release,
			vndb_vn_id: vn.vndb_vn_id,
			image: vn.image
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `vn`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `vn`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	updateVn(vn:any):Observable<any> {
		let data = JSON.stringify({
			id: vn.id,
			title_jp: vn.title_jp,
			title_en: vn.title_en,
			hashtag: vn.hashtag,
			developer_id: vn.developer_id,
			date_release: vn.date_release,
			vndb_vn_id: vn.vndb_vn_id,
			image: vn.image
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.put(Constant.API_PATH + `vn/${vn.id}`, data, {headers:contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.put(Constant.API_PATH + `vn/${vn.id}`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	} 

	private handleError(error:any) {
		if (error instanceof Response) {
			return Observable.throw(error.json().error || 'backend server error');
		}

		console.warn("Error occurred" + error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error);
	}
}