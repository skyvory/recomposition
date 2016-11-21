import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class LineamentService {
	constructor(
		private authHttp: AuthHttp,
	) {}

	saveLineament(lineament:any):Observable<any> {
		let data = {
			id: lineament.id,
			character_id: lineament.character_id,
			mark: lineament.mark
		};

		if(lineament.id) {
			return this.authHttp.put(`http://localhost/record/public/api/character/${lineament.id}`, data, {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.authHttp.post(`http://localhost/record/public/api/character`, data, {headers: contentHeaders})
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