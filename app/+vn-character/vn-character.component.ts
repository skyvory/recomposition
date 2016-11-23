import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '../character.service';
import { VnService } from '../vn.service';
import { VndbService } from '../vndb.service';

@Component({
	moduleId: module.id,
	selector: 'vn-character-selector',
	templateUrl: 'vn-character.component.html'
})

export class VnCharacterComponent implements OnInit {
	constructor(
		public route: ActivatedRoute,
		public characterService: CharacterService,
		public vnService: VnService,
		public vndbService: VndbService
	) {}

	@Input() characters:any = [];
	vndb:any = [];

	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			let id = +params['id'];
			this.loadCharacter(id);
			this.loadVn(id);
			console.log("PARAM INIT EXECUTION");
		});
	}

	debugDump(): any {
		return JSON.stringify(this.characters);
	}

	loadCharacter(vn_id:number):void {
		this.characterService.getCharacters(vn_id).subscribe(response => {
			this.characters = response.data;
		});
	}

	vn:any = [];
	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response;
		});
	}

	onSubmit():void {
		console.log("SUBMISSION");
	}

	// retrieveVndbCharacter():void {
	// 	if(!localStorage.getItem('vndb_user') || !localStorage.getItem('vndb_pass')) {
	// 		console.log('VNDB credential is not set yet');
	// 		return;
	// 	}

	// 	let fetch = (page:number) => {
	// 		console.log("Retrieving page " + page + " of VNDB characters...");
	// 		this.vndbService.getCharacters(this.vndb.vn_id, page).subscribe(response => {
	// 			console.log(response);
	// 			let characters = response.data.items;
	// 			// chara processing
	// 			if(characters) {
	// 				for(let i in characters) {
	// 					if(characters[i].gender == "f" || characters[i].gender == "b") {
	// 						console.log(i);
	// 						this.vndb.characters.push(characters[i]);
	// 					}
	// 				}
	// 			}
	// 			console.log("VNDB characters get!");
	// 			// fetch next batch of character if there's more than 25. This extreme case occurs particularly with releases from SQUEEZ
	// 			if(response.data.more == true) {
	// 				page++;
	// 				fetch(page);
	// 			}
	// 		},
	// 		err => console.log("ERROR IN COMPONENT", err)
	// 		);
	// 	}
	// }

	// removeVndbCharacter = (item) => {
	// 	let index = this.vndb.characters.indexOf(item);
	// 	this.vndb.characters.splice(index, 1);
	// }

	// saveVndbCharacter(chara, callback) {
	// 	let character;
	// 	character.vn_id = this.vn.id;
	// 	if(!chara.original.match(/[a-zA-Z]/i)) {
	// 		chara.original = chara.original.replace(/ /g, '　');
	// 	}
	// 	character.kanji = chara.original;
	// 	character.betsumyou = chara.aliases;
	// 	character.yobikata = chara.name;
	// 	character.birthmonth = chara.birthday[1];
	// 	character.birthday = chara.birthday[0];
	// 	character.height = chara.height;
	// 	character.bust = chara.bust;
	// 	character.waist = chara.waist;
	// 	character.hip = chara.hip;
	// 	character.image = chara.image;
	// 	character.vndb_character_id = chara.id;

	// 	this.characterService.saveCharacter(character).subscribe(response => {
	// 		console.log(chara.original + " saved successfully!");
	// 		console.log(response);
	// 		// Remove selected VNDB character first
	// 		this.removeVndbCharacter(chara);
	// 		// Then append saved character to scope
	// 		this.characters = this.characters.concat(response);
	// 		if(callback) {
	// 			callback({'success': true});
	// 		}
	// 	},
	// 	err => {
	// 		console.error("ERROR IN COMPONENT", err);
	// 		callback({'success': false});
	// 	});
	// }

	// saveAllVndbCharacters = function() {
	// 	let save = () => {
	// 		this.saveVndbCharacter(this.vndb.characters[0], function(success_response) {
	// 			if(success_response.success && this.vndb.characters.length) {
	// 				save();
	// 			}
	// 		});
	// 	}
	// 	save();
	// }

	// saveCharacter(chara) {
	// 	this.characterService.saveCharacter(chara).subscribe(response => {
	// 		console.log("Update to " + chara.kanji + " saved successfully!");
	// 	});
	// 	//>>>assign new id to new character
	// }

	// deleteCharacter(ev, chara) {
	// 	console.log(chara);
	// 	//
	// }

	// saveMark(chara) {

	// }

	customTrackBy(index:number, object:any):any {
		return index;
	}
}