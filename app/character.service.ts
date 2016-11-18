import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CharacterService {
	constructor(
		private authHttp: AuthHttp
	) {}

	getCharacters(vn_id:number):Observable<any> {
		let params:URLSearchParams = new URLSearchParams();
		params.set('vn_id', vn_id.toString());

		return this.authHttp.get(`http://localhost/record/public/api/character`, {headers: contentHeaders, search: params})
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	private handleError(error:any) {
		console.error("Error occured", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}