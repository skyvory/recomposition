import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AssessmentService } from '../../assessment.service';
import { Router } from '@angular/router';

@Component({
	selector: 'assessment-list-dialog-selector',
	templateUrl: './assessment-list-dialog.html',
	styleUrls: ['./assessment-list-dialog.css']
})
export class AssessmentListDialog {
	constructor(
		public dialogRef: MatDialogRef<AssessmentListDialog>,
		private assessmentService: AssessmentService,
		private router: Router
	) { }

	vn_id: string;
	assessments: any = [];
	isRetrievingAssessments: boolean = false;

	ngOnInit() {
		this.loadAssessment(this.vn_id);
	}

	loadAssessment(vn_id) {
		this.isRetrievingAssessments = true;
		let filter = {
			vn_id: vn_id
		}
		this.assessmentService.getAssessmentsV2(undefined, filter)
			.finally(() => {
				this.isRetrievingAssessments = false;
			})
			.subscribe(result => {
				this.assessments = result.data;
			});
	}

	// New assessment immediately created to avoid routing complication. One example case is where user would reload new assessment route and shown prepared assessment fill instead of newly inserted assessment
	newAssessment(): void {
		let assessment = {
			vn_id: this.vn_id
		}
		this.assessmentService.saveAssessment(assessment).subscribe(response => {
			this.dialogRef.close();
			let assessment = response;
			this.router.navigate(['/assessment', assessment.id, 'fill']);
		})
	}

	closeDialog(): void {
		this.dialogRef.close();
	}

	iconStatus(assessment: any): string {
		if (assessment.status == 'finished' && assessment.date_start && assessment.date_end) {
			return 'assignment_turned_in';
		}
		else if (assessment.status == 'dropped') {
			return 'assignment_returned';
		}
		else if (assessment.status == 'halted') {
			return 'assignment';
		}
		else if (assessment.date_start && assessment.status != 'finished' && assessment.status != 'dropped' && assessment.status != 'halted' && !assessment.date_end) {
			return 'visibility';
		}
		else if (!assessment.date_start && !assessment.date_end) {
			return 'insert_drive_file';
		}
		else {
			return 'assignment_late';
		}
	}
	
}