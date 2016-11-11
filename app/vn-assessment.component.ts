import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { AssessmentService } from './assessment.service';
import { VnService } from './vn.service';

@Component({
	moduleId: module.id,
	selector: 'vn-assessment-selector',
	templateUrl: 'vn-assessment.component.html'
})

export class VnAssessmentComponent implements OnInit, DoCheck {
	constructor(
		public router: Router,
		public route: ActivatedRoute,
		public assessmentService: AssessmentService,
		public vnService: VnService,
		private differs: KeyValueDiffers
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
			let id = +params['id'];
			this.loadAssessment(id);
			this.loadVn(id);
		});
	}

	vn:any = [];
	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response;
		});
	}

	loadAssessment(vn_id:number):void {
		this.assessmentService.getAssessment(vn_id).subscribe(response => {
			if(!response.id) {
				this.assessment.vn_id = vn_id;
			}
			else {
				this.assessment = response;
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

//>>> to use with (ngModelChange)="onChange($event)"
	has_change:any = {
		score_all: false,
		status: false
	};


	saveAssessment():void {
		if(!this.assessment.id) {
			this.assessmentService.createAssessment(this.assessment).subscribe(response => {
				console.log("Assessment saved", response);
			});
		}
		else {
			this.assessmentService.updateAssessment(this.assessment).subscribe(response => {
				console.log("VN update success", response);
				if(localStorage.getItem('vndb_toggle') == "0") {
					console.log("VNDB auto-update is off");
					return;
				}
				else if(!localStorage.getItem('vndb_user') || !localStorage.getItem('vndb_pass')) {
					console.log("VNDB credential is not set yet");
					return;
				}
				if(isNaN(Number(this.vn.vndb_vn_id)) ||this.vn.vndb_vn_id !== parseInt(this.vn.vndb_vn_id) || isNaN(parseInt(this.vn.vndb_vn_id))) {
					console.log("No VNDB ID identified");
				}

				if(this.has_change.score_all && this.vn.vndb_vn_id) {
					// update vndb
				}
				if(this.has_change.status && this.vn.vndb_vn_id) {
					// update vndb
				}
			});
		}
	}


}