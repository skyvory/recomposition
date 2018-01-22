import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VndbService } from '../../vndb.service';
import { VnService } from '../../vn.service';
import { DeveloperService } from '../../developer.service';
import { Router } from '@angular/router';

@Component({
	selector: 'portal-search-dialog-selector',
	templateUrl: './portal-search-dialog.html',
	styleUrls: ['./portal-search-dialog.css']
})
export class PortalSearchDialog {
	constructor(
		public dialogRef: MatDialogRef<PortalSearchDialog>,
		private vndbService: VndbService,
		private vnService: VnService,
		private developerService: DeveloperService,
		private router: Router,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	portalSearchResult: any = [];

	toggle: any = {
		portalSearchButtonDisable: false,
		portalDestinationApplyButtonDisable: false,
		portalDestinationPullReleasesButtonDisable: false
	};

	closeDialog(): void {
		this.dialogRef.close();
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

	searchDestination: any = {
		vndb: null,
		egs: null,
		vndbRelease: null
	};

	portalSearch: any = {
		vndb: [],
		egs: [],
		vndbRelease: []
	};

	applyDestination(): void {
		let vndb_vn = this.searchDestination.vndb;
		let egs_game = this.searchDestination.egs;
		let vndb_release = this.searchDestination.vndbRelease;

		if (!vndb_vn && !egs_game && !vndb_release) {
			// this.toast.pop("You need to select at least one search result to apply");
			return;
		}

		this.toggle.portalDestinationApplyButtonDisable = true;

		let vndb_user_hash = localStorage.getItem('vndb_user_hash');
		let vndb_pass_hash = localStorage.getItem('vndb_pass_hash');

		if (vndb_vn) {
			this.vn.title_original = vndb_vn.original ? vndb_vn.original : vndb_vn.title;
			this.vn.title_romaji = vndb_vn.title ? vndb_vn.title : vndb_vn.original;
			this.vn.alias = vndb_vn.aliases;
			this.vn.date_release = vndb_vn.released;
			this.vn.image = vndb_vn.image;
			this.vn.vndb_vn_id = vndb_vn.id;
		}

		if (vndb_release) {
			this.vn.title_original = vndb_release.original ? vndb_release.original : vndb_release.title;
			this.vn.title_romaji = vndb_release.title ? vndb_release.title : vndb_release.original;
			this.vn.date_release = vndb_release.released;
			this.vn.vndb_release_id = vndb_release.id;
		}

		if (egs_game) {
			this.vn.title_original = egs_game.gamename;
			this.vn.title_furigana = egs_game.gamefurigana;
			this.vn.date_release = this.vn.date_release != egs_game.sellday ? egs_game.sellday : this.vn.date_release;
			this.vn.erogamescape_game_id = egs_game.id;
			this.vn.homepage = egs_game.shoukai ? egs_game.shoukai : null;
			this.vn.twitter = egs_game.twitter ? egs_game.twitter : null;
		}


		let devOrig = null, devFuri = null, devRoman = null;


		// Request for VNDB Release if one vndb search result is selected as autofill source
		let developerHandleOnVndb = (): Promise<any> => {
			return new Promise<any>((resolve, reject) => {
				if (vndb_vn) {
					this.vndbService.getVndbRelease(vndb_vn.id, vndb_user_hash, vndb_pass_hash).subscribe(response => {
						// this.toast.pop("VNDB Release retrieved");
						let vndb_release = response.data.items['0'];
						if (response.data.items) {
							let toBreak = false;
							for (let i in response.data.items) {
								if (response.data.items[i].producers) {
									for (let j in response.data.items[i].producers) {
										if (response.data.items[i].producers[j].developer == true) {
											devOrig = response.data.items[i].producers[j].original ? response.data.items[i].producers[j].original : response.data.items[i].producers[j].name;
											devRoman = response.data.items[i].producers[j].original != null ? response.data.items[i].producers[j].name : response.data.items[i].producers[j].name;

											toBreak = true;
										}

										if (toBreak == true) {
											break;
										}
									}
								}
								if (toBreak == true) {
									break;
								}
							}
						}

						resolve(true);
					}),
						(err) => reject(false);
				}
				else {
					resolve(false);
				}
			});
		}

		// Apply developer property from producers array in selected vndb release search result
		let developerHandleOnVndbRelease = (): Promise<any> => {
			return new Promise<any>((resolve, reject) => {
				if (vndb_release) {
					let toBreak = false;
					if (vndb_release.producers) {
						for (let i in vndb_release.producers) {
							if (vndb_release.producers[i].developer == true) {
								devOrig = vndb_release.producers[i].original ? vndb_release.producers[i].original : vndb_release.producers[i].name;
								devRoman = vndb_release.producers[i].original != null ? vndb_release.producers[i].name : vndb_release.producers[i].original;

								toBreak = true;
							}

							if (toBreak == true) {
								break;
							}
						}
					}
					resolve(true);
				}
				else {
					resolve(false);
				}
			});
		}

		// Overwrite and fill Developer property from EGS search result if one of the results is selected
		let developerHandleOnEgs = (): Promise<any> => {
			return new Promise<any>((resolve, reject) => {
				if (egs_game) {
					if (vndb_vn) {
						if (egs_game.brandname != devOrig) {
							// this.toast.pop("Different VNDB Developer vs EGS Brandname");
							devOrig = egs_game.brandname;
						}
					}
					else {
						devOrig = egs_game.brandname;
					}
					devFuri = egs_game.brandfurigana;
					resolve(true);
				}
				else {
					resolve(false);
				}
			});
		}

		developerHandleOnVndb().then(res => {
			console.log("is vndb source selected", res);
			developerHandleOnVndbRelease().then(res => {
				console.log("is vndb release source selected", res);
				developerHandleOnEgs().then(res => {
					console.log("is egs source selected", res);
					// Developer properties has been filled. Commence checking to database.
					// this.toast.pop("checking dev in db...");
					let check = this.checkDeveloper(devOrig);
					check.then(dev => {
						this.vn.developer_id = dev.id;
						this.toggle.portalDestinationApplyButtonDisable = false;
						this.dialogRef.close(this.vn);
					},
						reason => {
							console.log("Fail reason", reason);
							// this.toast.pop("Developer not found. Automatically creating Developer...");
							let reg = this.createDeveloper(devOrig, devFuri, devRoman);
							reg.then(dev => {
								// this.toast.pop("developer automatically created and applied to this VN");
								this.vn.developer_id = dev.id;
								this.toggle.portalDestinationApplyButtonDisable = false;
								// Close the dialog and return VN value
								this.dialogRef.close(this.vn);
							},
								fail => {
									console.log("Fail in promise", fail);
									this.toggle.portalDestinationApplyButtonDisable = false;
									this.dialogRef.close(this.vn);
								});
						});
				});
			});
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
		return new Promise<string>((resolve, reject) => {
			this.developerService.createDeveloper(original, furi, romaji).subscribe(response => {
				resolve(response);
			},
				err => {
					reject(err);
				});
		});
	}

	selectVndbDestination(event: any, vndbNode: any) {
		if (event == false) {
			this.searchDestination.vndb = null;
			return;
		}
		for (let i = 0; i < this.portalSearch.vndb.length; i++) {
			if (this.portalSearch.vndb[i].id != vndbNode.id) {
				this.portalSearch.vndb[i].selected = false;
			}
		}
		this.searchDestination.vndb = vndbNode;
	}
	selectEgsDestination(event: any, egsNode: any) {
		if (event == false) {
			this.searchDestination.egs = null;
			return;
		}
		for (let i = 0; i < this.portalSearch.egs.length; i++) {
			if (this.portalSearch.egs[i].id != egsNode.id) {
				this.portalSearch.egs[i].selected = false;
			}
		}
		this.searchDestination.egs = egsNode;
	}

	portalSearchVn(search_query: string): void {
		if (!localStorage.getItem('vndb_user_hash') || !localStorage.getItem('vndb_pass_hash')) {
			// this.toast.pop("VNDB creential hasn't set yet");
			return;
		}
		if(!search_query.trim()) {
			return;
		}
		this.toggle.portalSearchButtonDisable = true;

		this.vnService.portalSearchVn(search_query).subscribe(response => {
			this.portalSearch.vndb = response.data.vndb.items;
			this.portalSearch.egs = response.data.egs;
			// this.toast.pop("Portal search completed");
			this.toggle.portalSearchButtonDisable = false;
		});
	}

	retrieveVndbReleases(vndb_id: number, event: any): void {
		// Disable the pressed button
		event.target.disabled = true;

		let vndb_user_hash = localStorage.getItem('vndb_user_hash');
		let vndb_pass_hash = localStorage.getItem('vndb_pass_hash');

		this.vndbService.getVndbRelease(vndb_id, vndb_user_hash, vndb_pass_hash).subscribe(response => {
			// this.toast.pop("VNDB Release retrieved");
			this.portalSearch.vndbRelease = response.data.items;
			event.target.disabled = false;
		});
	}

	selectVndbReleaseDestination(event: any, vndbReleaseNode: any) {
		if (event == false) {
			this.searchDestination.vndbRelease = null;
			return;
		}
		for (let i = 0; i < this.portalSearch.vndbRelease.length; i++) {
			if (this.portalSearch.vndbRelease[i].id != vndbReleaseNode.id) {
				this.portalSearch.vndbRelease[i].selected = false;
			}
		}
		this.searchDestination.vndbRelease = vndbReleaseNode;
	}

}