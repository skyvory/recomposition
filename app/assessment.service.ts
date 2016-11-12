import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssessmentService {
	constructor(
		public authHttp: AuthHttp
	) {}

	getAssessment(vn_id:number):Observable<any> {
		return this.authHttp.get(`http://localhost/record/public/api/assessment/${vn_id}`, {headers: contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
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
			return this.authHttp.put(`http://localhost/record/public/api/assessment/${assessment.id}`, data, {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.authHttp.post('http://localhost/record/public/api/assessment', data, {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	private handleError(error:any) {
		console.error("Error occured", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}