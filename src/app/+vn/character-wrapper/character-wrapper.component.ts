import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';

@Component({
  selector: 'app-character-wrapper',
  templateUrl: './character-wrapper.component.html',
  styleUrls: ['./character-wrapper.component.css']
})
export class CharacterWrapperComponent implements OnInit {

  constructor(		private route: ActivatedRoute,		private vnService: VnService,

) { }

  ngOnInit() {
    	this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.loadVn(id);
		});
  }
  
	vn:any = [];

  	loadVn(vn_id:number):void {
		this.vnService.getVn(vn_id).subscribe(response => {
			this.vn = response;
		});
	}

}
