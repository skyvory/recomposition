import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '../../character.service';
import { VnService } from '../../vn.service';
import { VndbService } from '../../vndb.service';
import { LineamentService } from '../../lineament.service';

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
		private lineamentService: LineamentService
	) {}

@Input() vn;
	@Input() characters:any = [];
	vndb:any = {
		characters: []
	};

	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			let id = +params['id'];
			this.loadCharacter(id);
			// this.loadVn(id);
			console.log("PARAM INIT EXECUTION");
		});
	}

	ngOnChanges(changes:any) {
		for(let propName in changes) {
			console.log(propName);
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
		console.log("SUBMISSION");
	}

	retrieveVndbCharacter():void {
		console.log("HUH");
		if(!localStorage.getItem('vndb_user') || !localStorage.getItem('vndb_pass')) {
			console.log('VNDB credential is not set yet');
			return;
		}

		let fetch = (page:number) => {
			console.log("Retrieving page " + page + " of VNDB characters...");
			this.vndbService.getCharacters(this.vndb.vn_id, page).subscribe(response => {
				console.log(response);
				let characters = response.data.items;
				// chara processing
				console.log("c", characters);
				if(characters) {
					for(let i in characters) {
						if(characters[i].gender == "f" || characters[i].gender == "b") {
							console.log("CHAR",characters[i]);
							this.vndb.characters.push(characters[i]);
							console.log("VNDB", this.vndb);
						}
						console.log(i);
					}
				}
				console.log("VNDB characters get!");
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
		console.log(this.vn);
		console.log(character);
		if(!chara.original.match(/[a-zA-Z]/i)) {
			chara.original = chara.original.replace(/ /g, '　');
		}
		character.kanji = chara.original;
		character.betsumyou = chara.aliases;
		character.yobikata = chara.name;
		character.birthmonth = chara.birthday[1];
		character.birthday = chara.birthday[0];
		character.height = chara.height;
		character.bust = chara.bust;
		character.waist = chara.waist;
		character.hip = chara.hip;
		character.image = chara.image;
		character.vndb_character_id = chara.id;

		this.characterService.saveCharacter(character).subscribe(response => {
			console.log(chara.original + " saved successfully!");
			console.log(response);
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
				console.log("success response", success_response);
				console.log(this.vndb.characters);
				console.log(this.vndb.characters.length);
				if(success_response.success && this.vndb.characters.length) {
					console.log("GODO");
					save();
				}
				else {
					console.log("HUH");
				}
			});
		}
		save();
	}

	saveCharacter(chara) {
		this.characterService.saveCharacter(chara).subscribe(response => {
			console.log("Update to " + chara.kanji + " saved successfully!");
			if(!chara.id) {
				let index = this.characters.indexOf(chara);
				this.characters[index].id = response.id;
			}
		});
		//>>>assign new id to new character
	}

	deleteCharacter(event, chara) {
		event.preventDefault();
		if(confirm("Delete " + chara.kanji + " ?")) {
			if(chara.id) {
				this.characterService.deleteCharacter(chara.id).subscribe(response => {});
			}
			let index = this.characters.indexOf(chara);
			this.characters.splice(index, 1);
			console.log(chara.kanji + " deleted");
		}
	}

	saveMark(chara) {
		console.log(chara);
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
			console.log("Lineament update success");
		});
	}

	purgeCharacterProperty(chara, property) {
		console.log(chara, property);
		let target_index = this.characters.map(function(e) {
			return e.id;
		}).indexOf(parseInt(chara.link));

		switch(property) {
			case 'id':
				this.characters[target_index].vndb_character_id = chara.id;
				break;
			case 'kanji':
				this.characters[target_index].kanji = chara.original;
				break;
			case 'betsumyou':
				this.characters[target_index].betsumyou = chara.alias;
				break;
			case 'yobikata':
				this.characters[target_index].yobikata = chara.name;
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
		console.log("EV", ev);
		let new_chara = Object.assign({}, {
			id: null,
			kanji: '',
			yobikata: '',
			betsumyou: '',
			birthmonth: '',
			birthday: '',
			height: '',
			bust: '',
			waist: '',
			hip: '',
			image: '',
			vndb_character_id: '',
			vn_id: this.vn.id
		});

		this.characters = this.characters.concat(new_chara);
		console.log('new chara instance prepared');
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
		if(event.which === 13 && chara.kanji !== chara.paste_kanji) {
			event.preventDefault();
			if(target === 'kanji') { 
				chara.kanji = chara.paste_kanji;
			}
		}
	}

	customTrackBy(index:number, object:any):any {
		return index;
	}
}