import { Component, OnInit, DoCheck, KeyValueDiffers, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment';

import { AssessmentService } from '../assessment.service';
import { VnService } from '../vn.service';
import { VndbService } from '../vndb.service';
import { ToastService } from '../toaster/toast.service';

@Component({
	// moduleId: module.id,
	selector: 'assessment-fill-selector',
	templateUrl: './assessment-fill.component.html'
})

export class AssessmentFillComponent implements OnInit, DoCheck {
	constructor(
		public router: Router,
		public route: ActivatedRoute,
		public assessmentService: AssessmentService,
		public vnService: VnService,
		public vndbService:VndbService,
		private differs: KeyValueDiffers,
		private toast: ToastService
	) {
		this.differ = differs.find({}).create(null);
	}

	differ: any;

	assessment:any = [];

	debugDump():any {
		return JSON.stringify(this.has_change);
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = +params['assessmentId'];
			this.loadAssessment(id);
			// this.loadVn(id);
		});
	}

	// vn:any = [];
	@Input() vn;
	// loadVn(vn_id:number):void {
	// 	this.vnService.getVn(vn_id).subscribe(response => {
	// 		this.vn = response;
	// 	});
	// }

	loadAssessment(assessment_id:number):void {
		this.assessmentService.getAssessment(assessment_id).subscribe(response => {
			if(!response.id) {
				this.assessment.vn_id = this.vn.id;
				this.assessment_local.date_start = moment().format('YYYY-MM-DD HH:mm:ss');
				this.assessment_local.date_end = moment().format('YYYY-MM-DD HH:mm:ss');
			}
			else {
				this.assessment = response;
				// this.assessment.date_start = moment.utc(response.date_start).toDate();
				this.assessment_local.date_start = response.date_start ? moment.utc(response.date_start, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss');
				this.assessment_local.date_end = response.date__end ? moment.utc(response.date_end, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss');
			}
		});
	}

	ngDoCheck() {
		let changes = this.differ.diff(this.assessment);
		if(changes) {
			changes.forEachChangedItem(obj => {
				if(obj.key === "score_all") {
					this.has_change.score_all = true;
				}
				if(obj.key === "status") {
					this.has_change.status = true;
				}
			});
		}
	}

	has_change:any = {
		score_all: false,
		status: false,
		date_start: false,
		date_end: false
	};

	assessment_local:any = {
		date_start: '',
		date_end: ''
	};

	saveAssessment():void {
		// format archive_savedata into writtable value
		if(this.assessment.archive_savedata == true) {
			this.assessment.archive_savedata = 1;
		}
		else if(this.assessment.archive_savedata == false) {
			this.assessment.archive_savedata = 0;
		}

		// convert datetime to UTC
		if(this.has_change.date_start) {
			this.assessment.date_start = moment(this.assessment_local.date_start, 'YYYY-MM-DD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss');
		}
		if(this.has_change.date_end) {
			this.assessment.date_end = moment(this.assessment_local.date_end, 'YYYY-MM-DD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss');
		}

		
		this.assessmentService.saveAssessment(this.assessment).subscribe(response => {
			this.toast.pop("Assessment saved");
			if(!this.assessment.id) {
				this.assessment.id = response.id;
			}

			if(localStorage.getItem('vndb_toggle') == "0" || !localStorage.getItem('vndb_toggle')) {
				this.toast.pop("VNDB auto-update is off");
				return;
			}
			else if(!localStorage.getItem('vndb_user') || !localStorage.getItem('vndb_pass')) {
				this.toast.pop("VNDB credential is not set yet");
				return;
			}
			if(isNaN(Number(this.vn.vndb_vn_id)) ||this.vn.vndb_vn_id !== parseInt(this.vn.vndb_vn_id) || isNaN(parseInt(this.vn.vndb_vn_id))) {
				this.toast.pop("No VNDB ID identified");
			}

			if(this.has_change.score_all && this.vn.vndb_vn_id) {
				this.vndbService.setVote(this.vn.vndb_vn_id, this.assessment.score_all).subscribe(response => {
					this.toast.pop("Vote saved");
				},
				err => {
					console.log("ERROR VOTE", err)
				});
			}
			if(this.has_change.status && this.vn.vndb_vn_id) {
				let status = null;
				if(this.assessment.status == 'finished')
					status = 'finished';
				else if(this.assessment.status == 'halted')
					status = 'stalled';
				else if(this.assessment.status == 'decomposed')
					status = 'dropped';

				if(status) {
					this.vndbService.setStatus(this.vn.vndb_vn_id, status).subscribe(response => {
						console.log("Status saved");
					},
					err => {
						console.log("ERROR STATUS", err);
					});
				}
			}
		});
	}

	dateStartNow():void {
		this.assessment_local.date_start = moment().format('YYYY-MM-DD HH:mm:ss');
	}

	dateEndNow():void {
		this.assessment_local.date_end = moment().format('YYYY-MM-DD HH:mm:ss');
	}

}