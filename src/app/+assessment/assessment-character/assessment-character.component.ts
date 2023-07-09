import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '../../character.service';
import { VnService } from '../../vn.service';
import { VndbService } from '../../vndb.service';
import { LineamentService } from '../../lineament.service';
import { AssessmentService } from '../../assessment.service';
import { ActiveService } from '../../active.service';
import { ToastService } from '../../toaster/toast.service';
import { FileUploadService } from '../../file-upload.service';
import { FileUploader } from 'ng2-file-upload';
import { AuthenticationService } from '../../authentication.service';

@Component({
	// moduleId: module.id,
	selector: 'assessment-character-selector',
	templateUrl: './assessment-character.component.html',
	styleUrls: ['./assessment-character.component.css']
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
		private toast: ToastService,
		private fileUploadService: FileUploadService,
		private authenticationService: AuthenticationService
	) {}

@Input() vn;
	@Input() characters:any = [];
	vndb:any = {
		characters: []
	};
	user:any = {};

	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			let id = +params['assessmentId'];
			this.preLoad(id);
		});
		this.user = this.authenticationService.activeUser();
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

	retrieveVndbCharacter2(): void {
		if (!localStorage.getItem('vndb_token')) {
			this.toast.pop('VNDB credential is not set yet');
			return;
		}

		let fetch = (page: number) => {
			this.toast.pop("Retrieving page " + page + " of VNDB characters...");
			this.vndbService.getCharacters2(this.vndb.vn_id, page).subscribe(response => {
				console.log("RESP", response);
				let characters = response.data.results;
				// chara processing
				if (characters) {
					for (let i in characters) {
						let char = characters[i].sex;
						if(char != null) {
							// Chara sex property: Possibly null, otherwise an array of two strings: the character’s apparent (non-spoiler) sex and the character’s real (spoiler) sex. Possible values are null, "m", "f" or "b" (meaning “both”).
							if (char[0] == "f" || char[1] == "f" || char[0] == "b" || char[1] == "b") {
								this.vndb.characters.push(characters[i]);
							}
						}
						else {
							this.vndb.characters.push(characters[i]);
						}
					}
				}
				this.toast.pop("VNDB characters get!");
				// fetch next batch of character if there's more than 100
				if (response.data.more == true) {
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
		character.name_original = chara.original ? chara.original : chara.name;
		character.name_betsumyou = chara.aliases ? chara.aliases.toString() : "";
		character.name_furigana = chara.name ? chara.name : "";
		character.birthmonth = chara.birthday ? chara.birthday[0] : null;
		character.birthday = chara.birthday ? chara.birthday[1] : null;
		character.height = chara.height;
		character.weight = chara.weight;
		character.blood_type = chara.blood_type;
		character.bust = chara.bust;
		character.waist = chara.waist;
		character.hip = chara.hips;
		character.image = chara.image.url;
		character.vndb_character_id = chara.id.substr(1);
		character.age = chara.age;
		character.description = chara.cup ? chara.cup + " cup." : "";

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
				this.characters[target_index].vndb_character_id = chara.id.substr(1);
				break;
			case 'name_original':
				this.characters[target_index].name_original = chara.original ? chara.original : chara.name;
				break;
			case 'name_betsumyou':
				this.characters[target_index].name_betsumyou = chara.alias;
				break;
			case 'name_furigana':
				this.characters[target_index].name_furigana = chara.name;
				break;
			case 'birthdate':
				this.characters[target_index].birthmonth = chara.birthday[0];
				this.characters[target_index].birthday = chara.birthday[1];
				this.characters[target_index].age = chara.age;
				break;
			case 'height':
				this.characters[target_index].height = chara.height;
				this.characters[target_index].weight = chara.weight;
				this.characters[target_index].blood_type = chara.blood_type;
				break;
			case 'bwh':
				this.characters[target_index].bust = chara.bust;
				this.characters[target_index].waist = chara.waist;
				this.characters[target_index].hip = chara.hips;
				break;
			case 'image':
				this.characters[target_index].image = chara.image.url;
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

	public uploader:FileUploader = this.fileUploadService.uploadInstance;
	public hasBaseDropZoneOver:boolean = false;
	public fileOverBase(e:any, id:number):void {
		this.hasBaseDropZoneOver = e ? id : e;
	}

	uploadQueue:any = [];
	isNowUploading:boolean = false;

	dropTrigger(event, chara):void {
		let character_id = chara.id;
    let droppedFiles = event.dataTransfer.files;
    for(let i = 0; i < droppedFiles.length; i++) {
      let itemToQueue = {
        character_id: character_id,
        file: droppedFiles[i],
				chara: chara
      };
      console.log("ITEM TO QUEUE", itemToQueue);
      this.uploadQueue.push(itemToQueue);
    }

    if(!this.isNowUploading) {
      this.isNowUploading = true;
      this.fireUpload();
    }
  }

	fireUpload():void {
    if(this.uploadQueue.length > 0) {
      let firstServe = this.uploadQueue[Object.keys(this.uploadQueue)[0]];
      if(firstServe) {
        this.characterService.uploadImage(firstServe.character_id, firstServe.file).subscribe(response => {
					let chara_index = this.characters.indexOf(firstServe.chara);
					this.characters[chara_index].local_image_url = response.data.local_image_url;
					this.characters[chara_index].local_image = response.data.local_image;
          let index = this.uploadQueue.indexOf(firstServe);

          // Indexing stability trial to test integrity of index between Object.keys and indexOf
          if(JSON.stringify(firstServe) === JSON.stringify(this.uploadQueue[Object.keys(this.uploadQueue)[index]]))
            console.log("INDEX STABILITY TRIAL", true, "with index", index);
          else
            console.warn("INDEX STABILITY TRIAL", false, "indexOf vs Object.keys return diverse result");
          // End block of index stability trial

          this.uploadQueue.splice(index, 1);
          this.toast.pop(firstServe.file.name + ' successfully saved');

          // Recurse upload for next queue
          if(this.uploadQueue.length > 0) {
            this.fireUpload();
          }
          else {
            this.isNowUploading = false;
          }
        });
      }
    }
  }
}