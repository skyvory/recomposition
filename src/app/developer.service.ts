import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';

import { contentHeaders } from './common/headers';
// import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class DeveloperService {
	constructor(
		// public authHttp: AuthHttp,
		public authenticationService: AuthenticationService,
		public http: Http
	) {}

	getDevelopers(): Observable<any> {
		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.get(Constant.API_PATH + `developer`, { headers: contentHeaders })
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.get(Constant.API_PATH + `developer`, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	searchDeveloper(original:string):Observable<any> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('original', original);

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.get(Constant.API_PATH + `developer`, {headers: contentHeaders, search: params})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.get(Constant.API_PATH + `developer`, this.authenticationService.optionParam(params))
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	createDeveloper(original:string, furi:string, romaji:string):Observable<any> {
		let data = JSON.stringify({
			original: original,
			furi: furi,
			romaji: romaji
		});

		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.post(Constant.API_PATH + `developer`, data, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			return this.http.post(Constant.API_PATH + `developer`, data, this.authenticationService.option)
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
		if (error instanceof Response) {
			return Observable.throw(error.json().error || 'backend server error');
		}

		console.warn("Error occurred" + error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error);
	}
}



// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

// import { contentHeaders } from './common/headers';
// import { AuthHttp } from 'angular2-jwt';

// @Injectable()
// export class DeveloperService {
// 	constructor(
// 		public authHttp: AuthHttp,
// 	) {}

// 	getDevelopers(): Observable<any> {
// 		return this.authHttp.get('http://localhost/record/public/api/developer', { headers: contentHeaders })
// 			.map(
// 				(response:Response) => {
// 					return response.json();
// 				},
// 				err => console.warn(err)
// 			);
// 	}
// }