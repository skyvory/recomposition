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
export class LineamentService {
	constructor(
		// private authHttp: AuthHttp,
		private authenticationService: AuthenticationService,
		private http: Http
	) {}

	saveLineament(lineament:any):Observable<any> {
		let data = {
			id: lineament.id,
			character_id: lineament.character_id,
			mark: lineament.mark
		};

		if(lineament.id) {
			if(Constant.USE_ANGULAR2JWT) {
				// return this.authHttp.put(Constant.API_PATH + `lineament/${lineament.id}`, data, {headers: contentHeaders})
				// 	.map(
				// 		(response:Response) => {
				// 			return response.json();
				// 		}
				// 	)
				// 	.catch(this.handleError)
				// ;
			}
			else {
				return this.http.put(Constant.API_PATH + `lineament/${lineament.id}`, data, this.authenticationService.option)
					.map(
						(response:Response) => {
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
		}
		else {
			if(Constant.USE_ANGULAR2JWT) {
				// return this.authHttp.post(Constant.API_PATH + `lineament`, data, {headers: contentHeaders})
				// 	.map(
				// 		(response:Response) => {
				// 			return response.json();
				// 		}
				// 	)
				// 	.catch(this.handleError)
				// ;
			}
			else {
				return this.http.post(Constant.API_PATH + `lineament`, data, this.authenticationService.option)
					.map(
						(response:Response) => {
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
		}
	}

	private handleError(error: any) {
		console.error("Error occurred", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}