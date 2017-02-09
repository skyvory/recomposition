import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AssessmentService } from '../assessment.service';
import { Router } from '@angular/router';

@Component({
	selector: 'assessment-list-dialog-selector',
	templateUrl: './assessment-list-dialog.html'
})
export class AssessmentListDialog {
	constructor(
		public dialogRef: MdDialogRef<AssessmentListDialog>,
		private assessmentService: AssessmentService,
		private router: Router
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

	// New assessment immediately created to avoid routing complication. One example case is where user would reload new assessment route and shown prepared assessment fill instead of newly inserted assessment
	newAssessment():void {
		let assessment = {
			vn_id: this.vn_id
		}
		this.assessmentService.saveAssessment(assessment).subscribe(response => {
			this.dialogRef.close();
			let assessment = response;
			this.router.navigate(['/assessment', assessment.id, 'fill']);
		})
	}
}