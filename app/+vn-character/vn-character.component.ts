import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '../character.service';
import { VnService } from '../vn.service';

@Component({
	moduleId: module.id,
	selector: 'vn-character-selector',
	templateUrl: 'vn-character.component.html'
})

export class VnCharacterComponent implements OnInit {
	constructor(
		public route: ActivatedRoute,
		public characterService: CharacterService,
		public vnService: VnService
	) {}

	characters:any = [];

	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			let id = +params['id'];
			this.loadCharacter(id);
			this.loadVn(id);
		});
	}

	debugDump(): any {
		return JSON.stringify(this.characters);
	}

	loadCharacter(vn_id:number):void {
		this.characterService.getCharacters(vn_id).subscribe(response => {
			this.characters = response;
		});
	}

	vn:any = [];
	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response;
		});
	}
}