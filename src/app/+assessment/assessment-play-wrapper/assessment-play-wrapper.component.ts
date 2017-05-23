import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';
import { ActiveService } from '../../active.service';
import { AssessmentService } from '../../assessment.service';

@Component({
  selector: 'app-assessment-play-wrapper',
  templateUrl: './assessment-play-wrapper.component.html',
  styleUrls: ['./assessment-play-wrapper.component.css']
})
export class AssessmentPlayWrapperComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private vnService: VnService,
    private active: ActiveService,
    private assessmentService: AssessmentService
  ) { }

  ngOnInit() {
    this.linkAssessmentId = +this.route.snapshot.params['assessmentId'];
    this.preLoad(this.linkAssessmentId);
  }

  linkAssessmentId: number;
  assessment:any = [];
  vn:any = [];
  limitedVnOriginalTitle:string = '';

  loadVn(vn_id:number):void {
    this.vnService.getVn(vn_id).subscribe(response => {
      this.vn = response.data;
      this.limitedVnOriginalTitle = this.vn.title_original.length > 12 ? this.vn.title_original.substring(0, 12).trim() + '...' : this.vn.title_original;
    });
  }

  preLoad(assessmentId:number):void {
		if(this.active.assessment && this.active.assessment.vn_id) {
			this.loadVn(this.active.assessment.vn_id);
		}
		else {
			this.assessmentService.getAssessment(assessmentId).subscribe(response => {
        this.assessment = response;
				this.loadVn(response.vn_id);
			});
		}
	}

}
