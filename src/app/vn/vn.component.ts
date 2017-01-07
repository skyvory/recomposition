import { Component, OnInit } from '@angular/core';
import { VnService } from '../vn.service';

@Component({
	selector: 'vn-selector',
	templateUrl: './vn.component.html',
	styleUrls: ['./vn.component.css']
})
export class VnComponent implements OnInit {

	constructor(
		private vnService: VnService
	) { }

	vns: any = [];
	ngOnInit() {
		this.loadVns();
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

}
