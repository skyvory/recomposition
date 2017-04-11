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
		this.linkAssessmentId = +this.route.snapshot.params['assessmentId'];
		let resolvedAssessment = this.route.snapshot.data['assessment'];
		this.loadVn(resolvedAssessment.vn_id);
  }

	vn:any = [];
	linkAssessmentId:number;
	limitedVnOriginalTitle:string = '';

	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response.data;
			this.limitedVnOriginalTitle = this.vn.title_original.length > 12 ? this.vn.title_original.substring(0, 12).trim() + '...' : this.vn.title_original;
		});
	}

}
