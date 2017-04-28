import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'sidebar-selector',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
		public router:Router,
		private route: ActivatedRoute,
    private location: Location,
    private authenticationService: AuthenticationService
  ) { }

  user:any;

  ngOnInit() {
    this.user = this.authenticationService.activeUser();
  }

  goBack(): void {
    this.location.back();
  }

}
