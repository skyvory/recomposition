import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) { }

	_assessment: any = {};

	instantAssessment(assessment_id): Observable<any> {
		if (this._assessment && Object.keys(this._assessment).length > 0 && this._assessment.id == assessment_id) {
			return Observable.of(this._assessment).map(instantResponse => instantResponse);
		}
		else {
			return null;
		}
	}

	getAssessment(assessment_id: number): Observable<any> {

		if (this.instantAssessment(assessment_id)) {
			return this.instantAssessment(assessment_id);
		}
		else {
			return this.http.get(Constant.API_PATH + `assessment/${assessment_id}`, this.authenticationService.option)
				.map(
				(response: any) => {
					this._assessment = response;
					return response;
				}
				)
				.catch(this.handleError)
				;
		}
	}

	getAssessments(limit: number = 10, page: number = 1, filter?: string): Observable<any> {
		let params: HttpParams = new HttpParams();
		params = params.append('limit', limit.toString());
		params = params.append('page', page.toString());
		params = params.append('filter', filter.toString());

		return this.http.get(Constant.API_PATH + 'assessment', this.authenticationService.optionParam(params))
			.map(
			(response: any) => response
			)
			.catch(this.handleError)
			;
	}

	getAssessmentsV2(options?: any, filter?: any): Observable<any> {

		let params: HttpParams = new HttpParams();

		if (options && options.limit)
			params = params.append('limit', options.limit.toString());
		if (options && options.page)
			params = params.append('page', options.page.toString());

		if (filter.search)
			params = params.append('search_filter', filter.search.toString());
		if (filter.vn_id) {
			params = params.append('vn_id', filter.vn_id.toString());
		}
		if (filter.period) {
			params = params.append('period_filter', filter.period.toString());
		}
		if (filter.status) {
			params = params.append('status_filter', filter.status.toString());
		}
		if (filter.node) {
			params = params.append('node_filter', filter.node.toString());
		}

		return this.http.get(Constant.API_PATH + 'assessment', this.authenticationService.optionParam(params))
			.map(
			(response: any) => response
			)
			.catch(this.handleError)
			;
	}

	saveAssessment(assessment: any): Observable<any> {
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

		if (assessment.id) {
			return this.http.put(Constant.API_PATH + `assessment/${assessment.id}`, data, this.authenticationService.option)
				.map(
				(response: any) => {
					this._assessment = data;
					return response;
				}
				)
				.catch(this.handleError)
				;
		}
		else {
			return this.http.post(Constant.API_PATH + `assessment`, data, this.authenticationService.option)
				.map(
				(response: any) => {
					this._assessment = data;
					return response;
				}
				)
				.catch(this.handleError)
				;
		}
	}

	private handleError(error: any) {
		console.error("Error occured", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.error || error);
	}
}