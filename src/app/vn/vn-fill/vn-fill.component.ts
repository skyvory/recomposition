import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { VnService } from '../../vn.service';
import { DeveloperService } from '../../developer.service';
// import { ToastService } from '../../toaster/toast.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/finally';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { PortalSearchDialog } from '../portal-search-dialog/portal-search-dialog';

@Component({
	selector: 'vn-new-selector',
	templateUrl: './vn-fill.component.html',
	styleUrls: ['./vn-fill.component.css']
})

export class VnFillComponent implements OnInit {

	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		public router: Router,
		private vnService: VnService,
		private developerService: DeveloperService,
		private route: ActivatedRoute,
		// private toast: ToastService
		public dialog: MatDialog
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	fillState: string = "";
	developers: any[] = [];
	toggle: any = {
		advanceOptions: false,
		vndbIdLoadButtonDisable: false,
		addDeveloperButtonDisable: false,
		saveButtonDisable: false
	};

	ngOnInit() {
		this.loadDevelopers();
		if (this.router.url === "/vn/new") {
			this.fillState = "new";
		}
		else if (this.router.url.split('/')[1] === "vn" && this.router.url.split('/')[3] === "edit") {
			this.fillState = "edit";
			// Convert the route parameter value to a number with the JavaScript (+) operator
			let id = +this.route.snapshot.params['id'];
			this.loadVn(id);
		}
	}

	loadDevelopers(): void {
		this.developerService.getDevelopers().subscribe(response => {
			this.developers = response.data;
		},
			err => console.log(err)
		);
	}

	loadVn(id: number): void {
		this.vnService.getVn(id).subscribe(response => {
			this.vn = response.data;
		});
	}

	vn: any = {
		title_original: '',
		title_romaji: '',
		alias: '',
		hashtag: '',
		developer_id: '',
		date_release: '',
		vndb_vn_id: '',
		image: '',
		homepage: '',
		twitter: '',
		erogamescape_game_id: '',
		game_engine: '',
		relations: []
	}

	debugDump(): any {
		return JSON.stringify(this.router.url.split('/'));
	}

	createVn(): void {
		this.toggle.saveButtonDisable = true;
		this.vnService.createVn(this.vn)
			.finally(() => {
				this.toggle.saveButtonDisable = false;
			})
			.subscribe(response => {
				// this.toast.pop("VN created successfully");
				this.router.navigate(['/vn']);
			});
	}

	updateVn(): void {
		this.toggle.saveButtonDisable = true;
		this.vnService.updateVn(this.vn)
			.finally(() => {
				this.toggle.saveButtonDisable = false;
			}).
			subscribe(response => {
				// this.toast.pop("VN updated successfully");
				this.router.navigate(['/vn']);
			});
	}

	checkDeveloper(original: string): Promise<any> {
		return new Promise<string>((resolve, reject) => {
			this.developerService.searchDeveloper(original).subscribe(response => {
				if (original == response.original) {
					resolve(response);
				}
				else {
					reject('no match found');
				}
			});
		});
	}

	createDeveloper(original: string, furi: string, romaji: string): Promise<any> {
		this.toggle.addDeveloperButtonDisable = true;
		return new Promise<string>((resolve, reject) => {
			this.developerService.createDeveloper(original, furi, romaji).subscribe(response => {
				this.developers.push(response);
				this.toggle.addDeveloperButtonDisable = false;
				resolve(response);
			},
				err => {
					this.toggle.addDeveloperButtonDisable = false;
					reject(err);
				});
		});
	}

	removeRelation(relation: any): void {
		let group_id = relation.group_id;
		let vn_id = relation.id;
		this.vnService.removeRelation(group_id, vn_id).subscribe(response => {
			if (response) {
				let index = this.vn.relations.indexOf(relation);
				this.vn.relations.splice(index, 1);
				// this.toast.pop("relation removed");
			}
		});
	}

	refreshCover(vn_id: any): void {
		this.vnService.refreshCover(vn_id).subscribe(response => {
			if (response) {
				// this.toast.pop("Cover refreshed!");
			}
		});
	}

	dialogConfig:MatDialogConfig = {
		width: '90vw',
		height: '90vh',
		maxWidth: 'none',
	}
	
	popPortalSearchDialog(): void {
		let dialogRef = this.dialog.open(PortalSearchDialog, this.dialogConfig);

		dialogRef.afterClosed().subscribe(result => {
			this.vn = result ? result : this.vn;
		});
	}
}