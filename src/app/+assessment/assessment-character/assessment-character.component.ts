import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '../../character.service';
import { VnService } from '../../vn.service';
import { VndbService } from '../../vndb.service';
import { LineamentService } from '../../lineament.service';
import { AssessmentService } from '../../assessment.service';
import { ActiveService } from '../../active.service';
import { ToastService } from '../../toaster/toast.service';

@Component({
	// moduleId: module.id,
	selector: 'assessment-character-selector',
	templateUrl: './assessment-character.component.html'
})

export class AssessmentCharacterComponent implements OnInit {
	constructor(
		public route: ActivatedRoute,
		public characterService: CharacterService,
		public vnService: VnService,
		public vndbService: VndbService,
		private lineamentService: LineamentService,
		private assessmentService: AssessmentService,
		private active: ActiveService,
		private toast: ToastService
	) {}

@Input() vn;
	@Input() characters:any = [];
	vndb:any = {
		characters: []
	};

	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			let id = +params['assessmentId'];
			this.preLoad(id);
		});
	}

	preLoad(assessmentId:number):void {
		if(this.active.assessment && this.active.assessment.vn_id) {
			this.loadCharacter(this.active.assessment.vn_id);
		}
		else {
			this.assessmentService.getAssessment(assessmentId).subscribe(response => {
				this.loadCharacter(response.vn_id);
			});
		}
	}

	ngOnChanges(changes:any) {
		for(let propName in changes) {
			if(propName === 'vn') {
				this.vndb.vn_id = this.vn.vndb_vn_id;
			}
		}
	}

	debugDump(): any {
		return JSON.stringify(this.characters.length);
	}

	loadCharacter(vn_id:number):void {
		this.characterService.getCharacters(vn_id).subscribe(response => {
			this.characters = response.data;
		});
	}

	// vn:any = [];
	// loadVn(vn_id:number):void {
	// 	this.vnService.getVn(vn_id).subscribe(response => {
	// 		this.vn = response;
	// 		this.vndb.vn_id = response.vndb_vn_id;
	// 	});
	// }

	onSubmit():void {
		//
	}

	retrieveVndbCharacter():void {
		if(!localStorage.getItem('vndb_user_hash') || !localStorage.getItem('vndb_pass_hash')) {
			this.toast.pop('VNDB credential is not set yet');
			return;
		}

		let fetch = (page:number) => {
			this.toast.pop("Retrieving page " + page + " of VNDB characters...");
			this.vndbService.getCharacters(this.vndb.vn_id, page).subscribe(response => {
				let characters = response.data.items;
				// chara processing
				if(characters) {
					for(let i in characters) {
						if(characters[i].gender == "f" || characters[i].gender == "b") {
							this.vndb.characters.push(characters[i]);
						}
					}
				}
				this.toast.pop("VNDB characters get!");
				// fetch next batch of character if there's more than 25. This extreme case occurs particularly with releases from SQUEEZ
				if(response.data.more == true) {
					page++;
					fetch(page);
				}
			},
			err => console.log("ERROR IN COMPONENT", err)
			);
		}

		let page = 1;
		fetch(page);
	}

	removeVndbCharacter(item):void {
		let index = this.vndb.characters.indexOf(item);
		this.vndb.characters.splice(index, 1);
	}

	saveVndbCharacter(chara, callback = null):void {
		let character:any = [];
		character.vn_id = this.vn.id;
		if(!chara.original.match(/[a-zA-Z]/i)) {
			chara.original = chara.original.replace(/ /g, '　');
		}
		character.name_original = chara.original;
		character.name_betsumyou = chara.aliases;
		character.name_furigana = chara.name;
		character.birthmonth = chara.birthday[1];
		character.birthday = chara.birthday[0];
		character.height = chara.height;
		character.weight = chara.weight;
		character.blood_type = chara.bloodt;
		character.bust = chara.bust;
		character.waist = chara.waist;
		character.hip = chara.hip;
		character.image = chara.image;
		character.vndb_character_id = chara.id;

		this.characterService.saveCharacter(character).subscribe(response => {
			this.toast.pop(chara.original + " saved successfully!");
			// Remove selected VNDB character first
			this.removeVndbCharacter(chara);
			// Then append saved character to scope
			this.characters = this.characters.concat(response);
			if(callback) {
				callback({'success': true});
			}
		},
		err => {
			console.error("ERR", err);
			callback({'success': false});
		});
	}

	saveAllVndbCharacters():void {
		let save = () => {
			this.saveVndbCharacter(this.vndb.characters[0], (success_response) => {
				if(success_response.success && this.vndb.characters.length) {
					save();
				}
				else {
				}
			});
		}
		save();
	}

	saveCharacter(chara) {
		this.characterService.saveCharacter(chara).subscribe(response => {
			if(!chara.id) {
				let index = this.characters.indexOf(chara);
				this.characters[index].id = response.id;
			}
			this.toast.pop("Update to " + chara.name_original + " saved successfully!");
		});
	}

	deleteCharacter(event, chara) {
		event.preventDefault();
		if(confirm("Delete " + chara.name_original + " ?")) {
			if(chara.id) {
				this.characterService.deleteCharacter(chara.id).subscribe(response => {});
			}
			let index = this.characters.indexOf(chara);
			this.characters.splice(index, 1);
			this.toast.pop(chara.name_original + " deleted");
		}
	}

	saveMark(chara) {
		let lineament = {
			id: chara.lineament_id || null,
			character_id: chara.id,
			mark: chara.mark
		};

		this.lineamentService.saveLineament(lineament).subscribe(response => {
			if(lineament.id === null) {
				let index = this.characters.indexOf(chara);
				this.characters[index].lineament_id = response.id;
			}
			this.toast.pop("Lineament update success");
		});
	}

	purgeCharacterProperty(chara, property) {
		let target_index = this.characters.map(function(e) {
			return e.id;
		}).indexOf(parseInt(chara.link));

		switch(property) {
			case 'id':
				this.characters[target_index].vndb_character_id = chara.id;
				break;
			case 'name_original':
				this.characters[target_index].name_original = chara.original;
				break;
			case 'name_betsumyou':
				this.characters[target_index].name_betsumyou = chara.alias;
				break;
			case 'name_furigana':
				this.characters[target_index].name_furigana = chara.name;
				break;
			case 'birthdate':
				this.characters[target_index].birthmonth = chara.birthday[1];
				this.characters[target_index].birthday = chara.birthday[0];
				break;
			case 'height':
				this.characters[target_index].height = chara.height;
				this.characters[target_index].weight = chara.weight;
				this.characters[target_index].blood_type = chara.bloodt;
				break;
			case 'bwh':
				this.characters[target_index].bust = chara.bust;
				this.characters[target_index].waist = chara.waist;
				this.characters[target_index].hip = chara.hip;
				break;
			case 'image':
				this.characters[target_index].image = chara.image;
				break;
			default:
				console.log("property is not registered yet");
				break;
		}
	}

	newCharacter(ev) {
		let new_chara = Object.assign({}, {
			id: null,
			name_original: '',
			name_furigana: '',
			name_betsumyou: '',
			birthmonth: '',
			birthday: '',
			height: '',
			bust: '',
			waist: '',
			hip: '',
			image: '',
			description: '',
			vndb_character_id: '',
			vn_id: this.vn.id
		});

		this.characters = this.characters.concat(new_chara);
		this.toast.pop('New chara instance prepared');
	}

	isNameMatch(current_name, original_name):boolean {
		if(current_name && original_name) {
			return current_name.replace(/ |　/g, '') == original_name.replace(/ |　/g, '') ? true : false;
		}
		else {
			return true;
		}
	}

	replaceValue(event, chara, target) {
		if(event.which === 13 && chara.name_original !== chara.paste_name_original) {
			event.preventDefault();
			if(target === 'name_original') { 
				chara.name_original = chara.paste_name_original;
			}
		}
	}

	customTrackBy(index:number, object:any):any {
		return index;
	}
}