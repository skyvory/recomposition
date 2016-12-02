import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { VnService } from './vn.service';

import { AuthHttp } from 'angular2-jwt';

export class Vn {
	id: number;
	title_jp: string;
	title_en: string;
	hashtag: string;
	developer_id: number;
	date_release: string;
	vndb_vn_id: number;
	image: string;
}

@Component({
	moduleId: module.id,
	selector: 'vn-selector',
	templateUrl: 'vn.component.html'
})

export class VnComponent implements OnInit{
	constructor(
		// public router:Router,
		private vnService: VnService,
		public authHttp: AuthHttp,
		private route: ActivatedRoute
	) {}

	vns: Vn[] = [];
	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			if(params['page']) {
				let prefix = params['page'].substring(0,1)
				let page = params['page'].substring(1);
				if(prefix == "p") {
					this.query.page = page;
				}
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
		this.vnService.getVns(this.query.limit, this.query.page, this.query.filter).subscribe(response => {
			this.vns = response.data;
			this.query.total = response.total;
		});
	}
}