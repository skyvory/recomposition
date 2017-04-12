import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contentHeaders } from './common/headers';
// import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class AssessmentService {
	constructor(
		// public authHttp: AuthHttp,
		private http: Http,
		private authenticationService: AuthenticationService
	) {}

	_assessment:any = {};

	instantAssessment(assessment_id):Observable<any> {
		if(this._assessment && Object.keys(this._assessment).length > 0  && this._assessment.id == assessment_id) {
			return Observable.of(this._assessment).map(instantResponse => instantResponse);
		}
		else {
			return null;
		}
	}

	getAssessment(assessment_id:number):Observable<any> {
		if(Constant.USE_ANGULAR2JWT) {
			// return this.authHttp.get(Constant.API_PATH + `assessment/${vn_id}`, {headers: contentHeaders})
			// 	.map(
			// 		(response:Response) => {
			// 			return response.json();
			// 		}
			// 	)
			// 	.catch(this.handleError)
			// ;
		}
		else {
			if(this.instantAssessment(assessment_id)) {
				return this.instantAssessment(assessment_id);
			}
			else {
				return this.http.get(Constant.API_PATH + `assessment/${assessment_id}`, this.authenticationService.option)
					.map(
						(response:Response) => {
							this._assessment = response.json();
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
		}
	}

	getAssessments(limit:number = 10, page:number = 1, filter?:string):Observable<any> {
		let params:URLSearchParams = new URLSearchParams();
		params.set('limit', limit.toString());
		params.set('page', page.toString());
		params.set('filter', filter.toString());

		return this.http.get(Constant.API_PATH + 'assessment', this.authenticationService.optionParam(params))
			.map(
				(response:Response) => response.json()
			)
			.catch(this.handleError)
		;
	}

	getAssessmentsV2(options?:any, filter?:any):Observable<any> {
		let params:URLSearchParams = new URLSearchParams();
		if(options && options.limit)
			params.set('limit', options.limit.toString());
		if(options && options.page)
			params.set('page', options.page.toString());
		if(filter.search)
			params.set('filter', filter.search.toString());
		if(filter.vn_id) {
			params.set('vn_id', filter.vn_id.toString());
		}

		return this.http.get(Constant.API_PATH + 'assessment', this.authenticationService.optionParam(params))
			.map(
				(response:Response) => response.json()
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
			if(Constant.USE_ANGULAR2JWT) {
				// return this.authHttp.put(Constant.API_PATH + `assessment/${assessment.id}`, data, {headers: contentHeaders})
				// 	.map(
				// 		(response:Response) => {
				// 			return response.json();
				// 		}
				// 	)
				// 	.catch(this.handleError)
				// ;
			}
			else {
				return this.http.put(Constant.API_PATH + `assessment/${assessment.id}`, data, this.authenticationService.option)
					.map(
						(response:Response) => {
							this._assessment = data;
							return response.json();
						}
					)
					.catch(this.handleError)
				;
			}
		}
		else {
			if(Constant.USE_ANGULAR2JWT) {
				// return this.authHttp.post(Constant.API_PATH + `assessment`, data, {headers: contentHeaders})
				// 	.map(
				// 		(response:Response) => {
				// 			return response.json();
				// 		}
				// 	)
				// 	.catch(this.handleError)
				// ;
			}
			else {
				return this.http.post(Constant.API_PATH + `assessment`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						this._assessment = data;
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