import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
// import { AuthenticationService } from './authentication.service';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class VnService {
	constructor(
		public authHttp: AuthHttp,
		private http: Http,
		// private authenticationService: AuthenticationService,
	) {}

	getVns(): Observable<any> {
		return this.authHttp.get('http://localhost/record/public/api/vn', { headers: contentHeaders })
			.map(
				(response:Response) => {
					// console.log("RAW", response);
					// console.log("JSON", response.json());
					// data => data.json()
					return response.json();
				},
				err => console.warn(err)
			)
			.catch(
				(error:any) => Observable.throw(error.json().error || 'Server error')
			)
		;

		// return this.authHttp.get('http://localhost/record/public/api/vn', { headers: contentHeaders })
		// 	.map((response:Response) => {
		// 		console.log(response);
		// 		return response;
		// 	})

		// return this.authHttp.get('http://localhost/record/public/api/vn', { headers: contentHeaders })
		// 	.map(
		// 	data => {
		// 		console.log("VN", data);
		// 	},
		// 	err => console.log(err),
		// 	() => console.log("Request complete")
		// );
		// let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		// let options = new RequestOptions({ headers: headers });

		// return this.http.get('http://localhost/record/public/api/vn', options)
		// 	.map((response: Response) => response.json());
	}
}