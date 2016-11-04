import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHttp } from 'angular2-jwt';
import { VnService } from './vn.service';
import { DeveloperService } from './developer.service';
import { VndbService } from './vndb.service';

@Component({
	moduleId: module.id,
	selector: 'vn-new-selector',
	templateUrl: 'vn-new.component.html'
})

export class VnNewComponent implements OnInit{
	constructor(
		public router:Router,
		public authHttp: AuthHttp,
		private vnService: VnService,
		private developerService: DeveloperService,
		private vndbService: VndbService
	) {}

	developers: any[] = [];

	ngOnInit() {
		this.developerService.getDevelopers().subscribe(response => {
			this.developers = response.data;
		});
	}

	vn:any = {
		title_jp: '',
		title_en: '',
		hashtag: '',
		developer_id: '',
		release_date: '',
		vndb_vn_id: '',
		image: ''
	}

	// xxx:any = '';
	xxx():any {
		return JSON.stringify(this.vn);
	}

	createVn():void {
		this.vnService.createVn(this.vn).subscribe(response => {
			this.router.navigate(['/vn']);
		});
	}

	retrieveVndbVn():void {
		let vndb_user = localStorage.getItem('vndb_user');
		let vndb_pass = localStorage.getItem('vndb_pass');
		console.log(vndb_user);

		this.vndbService.getVndbVn(this.vn.vndb_vn_id, vndb_user, vndb_pass).subscribe(response => {
			console.log(response);
			let vndb_vn = response.data.items['0'];
			this.vn.title_jp = vndb_vn.original ? vndb_vn.original : vndb_vn.title;
			this.vn.title_en = vndb_vn.title ? vndb_vn.title : "n/a";
			this.vn.date_release = vndb_vn.released;
			this.vn.image = vndb_vn.image;
		});

		// this.vndbService.getVndbRelease(this.vn.vndb_vn_id, vndb_user, vndb_pass).subscribe(response => {
		// 	console.log(response);
		// 	let vndb_release = response.data.data.items['0'];
		// 	if(response.data.data.items) {
		// 		let toBreak = false;
		// 		for(let i in response.data.data.items) {
		// 			if(response.data.data.items[i].producers) {
		// 				for(let j in response.data.data.items[j].producers) {
		// 					if(response.data.data.items[i].producers[j].developer == true) {
		// 						let check = checkDeveloper(response.data)
		// 						>> check $q equivalent in angular 2
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// })
	}
}