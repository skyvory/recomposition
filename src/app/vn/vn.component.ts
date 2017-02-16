import { Component, OnInit } from '@angular/core';
import { VnService } from '../vn.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AssessmentListDialog } from './assessment-list-dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'vn-selector',
	templateUrl: './vn.component.html',
	styleUrls: ['./vn.component.css']
})
export class VnComponent implements OnInit {

	constructor(
		private vnService: VnService,
		public dialog: MdDialog,
		private route: ActivatedRoute
	) { }

	vns: any = [];
	ngOnInit() {
		let resolvedVns = this.route.snapshot.data['vns'];
		console.log("RESOLVED", resolvedVns);
		this.vns = resolvedVns.data;
		this.query.total = resolvedVns.total;
		// this.loadVns();
	}

	query:any = {
		limit: 12,
		page: 1,
		filter: '',
		total: 0
	};

	loadVns():void {
		this.vnService.getVns(this.query.limit, this.query.page, this.query.filter).subscribe(response => {
			this.vns = response.data;
			this.query.total = response.total;
		});
	}

	dialogConfig:MdDialogConfig = {
		width: '800px',
		height: '500px',
		position: {
			top: '30px'
		}
	}

	popAssessments(vn_id):void {
		console.log("id", vn_id);
		let dialogRef = this.dialog.open(AssessmentListDialog, this.dialogConfig);
		dialogRef.componentInstance.vn_id = vn_id;
	}

}