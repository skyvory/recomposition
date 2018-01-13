import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';

import { contentHeaders } from './common/headers';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class DeveloperService {
	constructor(
		public authenticationService: AuthenticationService,
		public http: HttpClient
	) {}

	getDevelopers(): Observable<any> {
			return this.http.get(Constant.API_PATH + `developer`, this.authenticationService.option)
				.map(
					(response:any) => {
						return response;
					}
				)
				.catch(this.handleError)
			;
		}

	searchDeveloper(original:string):Observable<any> {
		let params: HttpParams = new HttpParams().append('original', original);

			return this.http.get(Constant.API_PATH + `developer`, this.authenticationService.optionParam(params))
				.map(
					(response:any) => {
						return response;
					}
				)
				.catch(this.handleError)
			;
		}

	createDeveloper(original:string, furi:string, romaji:string):Observable<any> {
		let data = JSON.stringify({
			original: original,
			furi: furi,
			romaji: romaji
		});

			return this.http.post(Constant.API_PATH + `developer`, data, this.authenticationService.option)
				.map(
					(response:any) => {
						return response;
					}
				)
				.catch(this.handleError)
			;
		}

	private handleError(error: any) {
		if (error instanceof Response) {
			return Observable.throw(error || 'backend server error');
		}

		console.warn("Error occurred" + error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error);
	}
}