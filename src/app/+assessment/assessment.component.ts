import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { VnService } from '../vn.service';
import { AssessmentService } from '../assessment.service';
// import { AuthHttp } from 'angular2-jwt';

export class Vn {
	id: number;
	title_original: string;
	title_romaji: string;
	hashtag: string;
	developer_id: number;
	date_release: string;
	vndb_vn_id: number;
	image: string;
}

@Component({
	// moduleId: module.id,
	selector: 'assessment-selector',
	templateUrl: './assessment.component.html',
	styleUrls: ['./assessment.component.css']
})

export class AssessmentComponent implements OnInit{
	constructor(
		// public router:Router,
		private vnService: VnService,
		// public authHttp: AuthHttp,
		private route: ActivatedRoute,
		private assessmentService: AssessmentService
	) {}

	vns: Vn[] = [];
	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			if(params['page']) {
				let page = params['page'];
				this.query.page = page;
			}
			this.loadVns();
		});
	}

	query:any = {
		limit: 10,
		page: 1,
		filter: '',
		total: 0
	};

	changePage(page) {
		this.query.page = page;
		this.loadVns();
	}

	loadVns():void {
		this.assessmentService.getAssessments(this.query.limit, this.query.page, this.query.filter).subscribe(response => {
			this.vns = response.data;
			this.query.total = response.total;
		});
	}
}