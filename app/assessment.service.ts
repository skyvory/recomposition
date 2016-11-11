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

	createAssessment(assessment:any):Observable<any> {
		let data = {
			vn_id: assessment.vn_id,
			date_start: assessment.date_start || null,
			date_end: assessment.date_end || null,
			node: assessment.node || null,
			status: assessment.status || null,
			score_story: assessment.score_story || null,
			score_naki: assessment.score_naki || null,
			score_nuki: assessment.score_nuki || null,
			score_comedy: assessment.score_comedy || null,
			score_graphic: assessment.score_graphic || null,
			score_all: assessment.score_all || null,
			savable: assessment.savable || null,
			archive_savedata: assessment.archive_savedata
		};
		return this.authHttp.post('http://localhost/record/public/api/assessment', data, {headers: contentHeaders})
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	updateAssessment(assessment:any):Observable<any> {
		let data = {
			vn_id: assessment.vn_id,
			date_start: assessment.date_start || null,
			date_end: assessment.date_end || null,
			node: assessment.node || null,
			status: assessment.status || null,
			score_story: assessment.score_story || null,
			score_naki: assessment.score_naki || null,
			score_nuki: assessment.score_nuki || null,
			score_comedy: assessment.score_comedy || null,
			score_graphic: assessment.score_graphic || null,
			score_all: assessment.score_all || null,
			savable: assessment.savable || null,
			archive_savedata: assessment.archive_savedata
		};
		return this.authHttp.put(`http://localhost/record/public/api/assessment/${assessment.id}`, data, {headers: contentHeaders})
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