import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class AssessmentService {
	constructor(
		public authHttp: AuthHttp,
		private http: Http,
		private authenticationService: AuthenticationService
	) {}

	getAssessment(vn_id:number):Observable<any> {
		if(Constant.USE_ANGULAR2JWT) {
			return this.authHttp.get(Constant.API_PATH + `assessment/${vn_id}`, {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.http.get(Constant.API_PATH + `assessment/${vn_id}`, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	saveAssessment(assessment:any):Observable<any> {
		let data = {
			id: assessment.id,
			vn_id: assessment.vn_id,
			date_start: assessment.date_start,
			date_end: assessment.date_end,
			node: assessment.node,
			status: assessment.status,
			score_story: assessment.score_story,
			score_naki: assessment.score_naki,
			score_nuki: assessment.score_nuki,
			score_comedy: assessment.score_comedy,
			score_graphic: assessment.score_graphic,
			score_all: assessment.score_all,
			savable: assessment.savable,
			archive_savedata: assessment.archive_savedata
		};

		if(assessment.id) {
			if(Constant.USE_ANGULAR2JWT) {
				return this.authHttp.put(Constant.API_PATH + `assessment/${assessment.id}`, data, {headers: contentHeaders})
					.map(
						(response:Response) => {
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
			else {
				return this.http.put(Constant.API_PATH + `assessment/${assessment.id}`, data, this.authenticationService.option)
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
				return this.authHttp.post(Constant.API_PATH + `assessment`, data, {headers: contentHeaders})
					.map(
						(response:Response) => {
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
			else {
				return this.http.post(Constant.API_PATH + `assessment`, data, this.authenticationService.option)
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

	private handleError(error:any) {
		console.error("Error occured", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}