import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { VnService } from '../vn.service';
import { AssessmentService } from '../assessment.service';

export class Assessment {
	id: number;
	title_original: string;
	title_romaji: string;
	hashtag: string;
	developer_id: number;
	date_release: string;
	image: string;
	local_image: string;
	vndb_vn_id: number;
}

@Component({
	selector: 'assessment-selector',
	templateUrl: './assessment.component.html',
	styleUrls: ['./assessment.component.css']
})

export class AssessmentComponent implements OnInit{
	constructor(
		private vnService: VnService,
		private route: ActivatedRoute,
		private assessmentService: AssessmentService
	) {}

	assessments: Assessment[] = [];

	ngOnInit() {
		if(this.route.snapshot.params['page']) {
			let page = +this.route.snapshot.params['page'];
			this.options.page = page;
		}
		this.loadAssessments();
	}

	options:any = {
		limit: 10,
		page: 1,
		total: 0
	};
	filter:any = {
		search: null,
		period: "all",
		status: "ongoing",
		node: "all"
	};

	changePage(page) {
		this.options.page = page;
		this.loadAssessments();
	}

	loadAssessments():void {
		this.assessmentService.getAssessmentsV2(this.options, this.filter).subscribe(response => {
			this.assessments = response.data;
			this.options.total = response.total;
		});
	}

	playtimeCalculation(assessment:any):number {
		if(!assessment.date_start || !assessment.date_end) {
			return 0;
		}
		
		let start = new Date(assessment.date_start);
		let end = new Date(assessment.date_end);
		let oneday = 24*60*60*1000;
		let dayDiff = Math.round(Math.abs((start.getTime() - end.getTime()) / (oneday)));
		return dayDiff;

	}

	countdownLoader:any;

	pessimisticFiltering():void {
		clearTimeout(this.countdownLoader);
		this.countdownLoader = setTimeout(() => {
			this.loadAssessments();
		}, 3 * 1000);
	}
}