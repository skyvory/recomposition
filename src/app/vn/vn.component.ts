import { Component, OnInit } from '@angular/core';
import { VnService } from '../vn.service';
// import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
// import { AssessmentListDialog } from './assessment-list-dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
	selector: 'vn-selector',
	templateUrl: './vn.component.html',
	styleUrls: ['./vn.component.css']
})
export class VnComponent implements OnInit {

	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	pageEvent: PageEvent;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private vnService: VnService,
		// public dialog: MdDialog,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	vns: any = [];
	user:any={};

	ngOnInit() {
		let resolvedVns = this.route.snapshot.data['vns'];
		console.log("RESOLVED", resolvedVns);
		this.vns = resolvedVns.data;
		this.query.total = resolvedVns.total;
		this.query.limit = resolvedVns.per_page;
		this.user = this.authenticationService.activeUser();
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

	changePage(event?:PageEvent) {
		this.query.page = Number(event.pageIndex) + 1;
		this.loadVns();
	}

	// dialogConfig:MdDialogConfig = {
	// 	width: '90%',
	// 	height: '85%',
	// 	position: {
	// 		top: '30px',
	// 		left: 'auto'
	// 	}
	// }

	// popAssessments(vn_id):void {
	// 	console.log("id", vn_id);
	// 	let dialogRef = this.dialog.open(AssessmentListDialog, this.dialogConfig);
	// 	dialogRef.componentInstance.vn_id = vn_id;
	// }

}