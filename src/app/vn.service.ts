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
	// >>>to update local _vn value when any update occurs

	// >>>todo: change static optional parameter into optional array. That way, the component doesn't have to throw undefined value as arguments
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

	instantVn(vnId:number):Observable<any> {
		if(this._vn && Object.keys(this._vn).length > 0 && this._vn.data.id == vnId) {
			return Observable.of(this._vn).map(instantResponse => instantResponse);
		}
		else {
			return null;
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
			if(this.instantVn(vnId)) {
				return this.instantVn(vnId);
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
			title_original: vn.title_original,
			title_romaji: vn.title_romaji,
			alias: vn.alias,
			hashtag: vn.hashtag,
			developer_id: vn.developer_id,
			date_release: vn.date_release,
			vndb_vn_id: vn.vndb_vn_id,
			image: vn.image,
			game_engine: vn.game_engine,
			homepage: vn.homepage,
			twitter: vn.twitter,
			erogamescape_game_id: vn.erogamescape_game_id,
			vndb_release_id: vn.vndb_release_id,
			related_vn_id: vn.related_vn_id
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
			title_original: vn.title_original,
			title_romaji: vn.title_romaji,
			alias: vn.alias,
			hashtag: vn.hashtag,
			developer_id: vn.developer_id,
			date_release: vn.date_release,
			vndb_vn_id: vn.vndb_vn_id,
			image: vn.image,
			game_engine: vn.game_engine,
			homepage: vn.homepage,
			twitter: vn.twitter,
			erogamescape_game_id: vn.erogamescape_game_id,
			vndb_release_id: vn.vndb_release_id,
			related_vn_id: vn.related_vn_id
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
						this._vn = null;
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	} 

	removeRelation(group_id:any, vn_id:any):Observable<any> {
		let data = JSON.stringify({
			vn_group_id: group_id,
			vn_id: vn_id
		});

		
		return this.http.post(Constant.API_PATH + `vn/removeRelation`, data, this.authenticationService.option)
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	private handleError(error:any) {
		if (error instanceof Response) {
			return Observable.throw(error.json().error || 'backend server error');
		}

		console.warn("Error occurred" + error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error);
	}

	refreshCover(vn_id:any):Observable<any> {
		return this.http.post(Constant.API_PATH + `vn/refreshCover/${vn_id}`, '', this.authenticationService.option)
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	getScreenshots(vn_id:number) {
		return this.http.get(Constant.API_PATH + `vn/screenshots/${vn_id}`, this.authenticationService.option)
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	deleteScreenshot(screenshot_id:number) {
		return this.http.delete(Constant.API_PATH + `vn/screenshot/${screenshot_id}`, this.authenticationService.option)
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	updateScreenshot(screenshot:any) {
		let data = {
			description: screenshot.description
		}
		
		return this.http.put(Constant.API_PATH + `vn/screenshot/${screenshot.id}`, data, this.authenticationService.option)
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	portalSearchVn(search_query:string) {
		let data = {
			vndb_username_hash: localStorage.getItem('vndb_user_hash'),
			vndb_password_hash: localStorage.getItem('vndb_pass_hash')
		};
		
		return this.http.post(Constant.API_PATH + `portal/search/${search_query}`, data, this.authenticationService.option)
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	portalSearchVn2(search_query: string) {
		let data = {
			vndb_token: localStorage.getItem('vndb_token')
		};

		return this.http.post(Constant.API_PATH + `portal/search2/${search_query}`, data, this.authenticationService.option)
			.map(
				(response: Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
			;
	}
}