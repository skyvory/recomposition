import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';

@Component({
  selector: 'app-vn-assessment-wrapper',
  templateUrl: './vn-assessment-wrapper.component.html',
  styleUrls: ['./vn-assessment-wrapper.component.css']
})
export class VnAssessmentWrapperComponent implements OnInit {

  constructor(
  	private router: Router,
		private route: ActivatedRoute,
		private vnService: VnService,
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
