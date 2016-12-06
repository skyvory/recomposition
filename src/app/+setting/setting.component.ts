import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		this.loadVndbCredentials();
		this.checkVndbCredentials();
	}

	vndb:any = {
		username: '',
		password: '',
		status: ''
	};

	loadVndbCredentials():void {
		this.vndb.username = localStorage.getItem('vndb_user');
		this.vndb.password = localStorage.getItem('vndb_pass');
	}

	setVndbCredentials():void {
		localStorage.setItem('vndb_user', this.vndb.username);
		localStorage.setItem('vndb_pass', this.vndb.password);
	}

	checkVndbCredentials():void {
		let u = localStorage.getItem('vndb_user');
		let p = localStorage.getItem('vndb_pass');
		if(u && p) {
			this.vndb.status = "Credential is already set";
		}
		else {
			this.vndb.status = "No credential set yet";
		}
	}

}
