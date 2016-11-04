import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class VndbService {
	constructor(
		public authHttp: AuthHttp,
	) {}

	getVndbVn(vndb_vn_id:number, username:string, password:string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			username: username,
			password: password
		});
		console.log(data);
		return this.authHttp.post('http://localhost/record/public/vndb/vn', data, {headers: contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
	}

	getVndbRelease(vndb_vn_id:number, username:string, password:string): Observable<any> {
		let data = JSON.stringify({
			vndb_id: vndb_vn_id,
			username: username,
			password: password
		});
		return this.authHttp.post('http://localhost/record/public/vndb/release', data, {headers: contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
	}


	private handleError(error: any) {
		console.error("Error occurred", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}