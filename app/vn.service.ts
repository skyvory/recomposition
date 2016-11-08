import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class VnService {
	constructor(
		public authHttp: AuthHttp,
		private http: Http,
	) {}

	getVns():Observable<any> {
		return this.authHttp.get('http://localhost/record/public/api/vn', {headers: contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
	}

	getVn(vnId:number):Observable<any> {
		return this.authHttp.get(`http://localhost/record/public/api/vn/${vnId}`, {headers:contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
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
		return this.authHttp.post('http://localhost/record/public/api/vn', data, {headers: contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
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
		return this.authHttp.put(`http://localhost/record/public/api/vn/${vn.id}`, data, {headers:contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn("map err", err)
			)
			.catch(this.handleError)
		;
	} 

	private handleError(error:any) {
		console.error("Error occurred", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}