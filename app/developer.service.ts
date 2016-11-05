import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DeveloperService {
	constructor(
		public authHttp: AuthHttp
	) {}

	getDevelopers(): Observable<any> {
		return this.authHttp.get('http://localhost/record/public/api/developer', { headers: contentHeaders })
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
	}

	searchDeveloper(name_en:string):Observable<any> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('name_en', name_en);

		return this.authHttp.get('http://localhost/record/public/api/developer', {headers: contentHeaders, search: params})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
	}

	createDeveloper(name_en:string, name_jp:string):Observable<any> {
		let data = JSON.stringify({
			name_en: name_en,
			name_jp: name_jp
		});

		return this.authHttp.post('http://localhost/record/public/api/developer', data, {headers: contentHeaders})
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