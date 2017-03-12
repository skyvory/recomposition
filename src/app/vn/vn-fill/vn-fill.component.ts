import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

// import { AuthHttp } from 'angular2-jwt';
import { VnService } from '../../vn.service';
import { DeveloperService } from '../../developer.service';
import { VndbService } from '../../vndb.service';

@Component({
	// moduleId: module.id,
	selector: 'vn-new-selector',
	templateUrl: './vn-fill.component.html'
})

export class VnFillComponent implements OnInit{
	constructor(
		public router:Router,
		// public authHttp: AuthHttp,
		private vnService: VnService,
		private developerService: DeveloperService,
		private vndbService: VndbService,
		private route: ActivatedRoute,
	) {}

	fillState:string = "";
	developers:any[] = [];
	toggle:any = {
		advanceOptions: false
	};

	ngOnInit() {
		// this.developerService.getDevelopers().subscribe(response => {
		// 	this.developers = response.data;
		// });
		this.loadDevelopers();
		console.log(this.router.url);
		if(this.router.url === "/vn/new") {
			this.fillState = "new";
		}
		else if(this.router.url.split('/')[1] === "vn" && this.router.url.split('/')[3] === "edit") {
			this.fillState = "edit";
			// convert the route parameter value to a number with the JavaScript (+) operator
			let id = +this.route.snapshot.params['id'];
			this.loadVn(id);
		}
	}

	loadDevelopers():void {
		this.developerService.getDevelopers().subscribe(response => {
			this.developers = response.data;
			// this.developers = response.data.map(repo => {
			// 	repo.value = repo.name_en ? repo.name_en.toLowerCase() : repo.name_jp;
			// 	return repo;
			// });
		},
		err => console.log(err)
		);
	}

	loadVn(id:number):void {
		this.vnService.getVn(id).subscribe(response => {
			console.log(response);
			this.vn = response.data;
		});
	}

	vn:any = {
		title_original: '',
		title_romaji: '',
		alias: '',
		hashtag: '',
		developer_id: '',
		date_release: '',
		vndb_vn_id: '',
		image: ''
	}

	debugDump():any {
		return JSON.stringify(this.router.url.split('/'));
	}

	createVn():void {
		this.vnService.createVn(this.vn).subscribe(response => {
			console.log("VN created successfully", response);
			this.router.navigate(['/vn']);
		});
	}

	updateVn():void {
		this.vnService.updateVn(this.vn).subscribe(response => {
			console.log("VN updated successfully", response);
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
			this.vn.title_original = vndb_vn.original ? vndb_vn.original : vndb_vn.title;
			this.vn.title_romaji = vndb_vn.title ? vndb_vn.title : "n/a";
			this.vn.alias = vndb_vn.aliases;
			this.vn.date_release = vndb_vn.released;
			this.vn.image = vndb_vn.image;
		});

		this.vndbService.getVndbRelease(this.vn.vndb_vn_id, vndb_user, vndb_pass).subscribe(response => {
			console.log(response);
			let vndb_release = response.data.items['0'];
			if(response.data.items) {
				let toBreak = false;
				for(let i in response.data.items) {
					if(response.data.items[i].producers) {
						for(let j in response.data.items[i].producers) {
							if(response.data.items[i].producers[j].developer == true) {
								let producerToCheck = response.data.items[i].producers[j].original ? response.data.items[i].producers[j].original : response.data.items[i].producers[j].name;
								let check = this.checkDeveloper(producerToCheck);
								check.then(dev => {
									this.vn.developer_id = dev.id;
									console.log("DEV", dev);
								},
								reason => {
									console.log("REASON", reason);
									let reg = this.createDeveloper(response.data.items[i].producers[j].original, '', response.data.items[i].producers[j].name);
									reg.then(dev => {
										console.log("successfully create developer", dev);
										this.vn.developer_id = dev.id;
									},
									fail => {
										console.log("fail in promise", fail);
									});
								});

								toBreak = true;
							}

							if(toBreak == true) {
								break;
							}
						}
					}
					if(toBreak == true) {
						break;
					}
				}
			}
		},
		fail => {
			// fail get notification
		});
	}

	checkDeveloper(original:string):Promise<any> {
		return new Promise<string>((resolve, reject) => {
			this.developerService.searchDeveloper(original).subscribe(response => {
				if(original == response.original) {
					resolve(response);
				}
				else {
					reject('no match found');
				}
			});
		});
	}

	createDeveloper(original:string, furi:string, romaji:string):Promise<any> {
		return new Promise<string>((resolve, reject) => {
			this.developerService.createDeveloper(original, furi, romaji).subscribe(response => {
				this.developers.push(response);
				resolve(response);
			},
			err => {
				reject(err);
			});
		});
	}

	removeRelation(relation:any):void {
		let group_id = relation.group_id;
		let vn_id = relation.id;
		this.vnService.removeRelation(group_id, vn_id).subscribe(response => {
			if(response) {
				let index = this.vn.relations.indexOf(relation);
				this.vn.relations.splice(index, 1);
				console.log("relation removed", response);
			}
		});
	}

	refreshCover(vn_id:any):void {
		this.vnService.refreshCover(vn_id).subscribe(response => {
			if(response) {
				console.log("Cover refreshed!");
			}
		});
	}
}