import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AssessmentService } from '../assessment.service';

@Component({
	selector: 'assessment-list-dialog-selector',
	templateUrl: './assessment-list-dialog.html'
})
export class AssessmentListDialog {
	constructor(
		public dialogRef: MdDialogRef<AssessmentListDialog>,
		private assessmentService: AssessmentService
	) {}

	vn_id:string;
	assessments:any = [];

	ngOnInit() {
		this.loadAssessment(this.vn_id);
	}

	loadAssessment(vn_id) {
		let filter = {
			vn_id: vn_id
		}
		this.assessmentService.getAssessmentsV2(undefined, filter).subscribe(result => {
			this.assessments = result.data;
		});
	}
}