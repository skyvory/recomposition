import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';
import { ActiveService } from '../../active.service';
import { AssessmentService } from '../../assessment.service';

@Component({
	selector: 'app-assessment-character-wrapper',
	templateUrl: './assessment-character-wrapper.component.html',
	styleUrls: ['./assessment-character-wrapper.component.css']
})
export class AssessmentCharacterWrapperComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private vnService: VnService,
		private active: ActiveService,
		private assessmentService: AssessmentService
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = +params['assessmentId'];
			this.preLoad(id);
			this.linkAssessmentId = id;
		});
	}
	
	vn:any = [];
	linkAssessmentId:number;

	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response.data;
		});
	}

	preLoad(assessmentId:number):void {
		if(this.active.assessment && this.active.assessment.vn_id) {
			this.loadVn(this.active.assessment.vn_id);
		}
		else {
			this.assessmentService.getAssessment(assessmentId).subscribe(response => {
				this.loadVn(response.vn_id);
			});
		}
	}

}
