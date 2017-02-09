import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';
import { AssessmentService } from '../../assessment.service';
import { ActiveService } from '../../active.service';

@Component({
  selector: 'app-assessment-fill-wrapper',
  templateUrl: './assessment-fill-wrapper.component.html',
  styleUrls: ['./assessment-fill-wrapper.component.css']
})
export class AssessmentFillWrapperComponent implements OnInit {

  constructor(
  	private router: Router,
		private route: ActivatedRoute,
		private vnService: VnService,
		private assessmentService: AssessmentService,
		private active: ActiveService
  	) { }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
			let id = +params['assessmentId'];
			this.linkAssessmentId = id;
			this.preLoad(id);
		});
  }

	vn:any = [];
	linkAssessmentId:number;

	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response.data;
			console.log(this.vn);
		});
	}

	preLoad(assessment_id:number):void {
		this.assessmentService.getAssessment(assessment_id).subscribe(response => {
			this.active.assessment = response;
			this.loadVn(response.vn_id);
		})
	}

}
