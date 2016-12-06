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
		status: '',
		toggle: ''
	};

	loadVndbCredentials():void {
		this.vndb.username = localStorage.getItem('vndb_user');
		this.vndb.password = localStorage.getItem('vndb_pass');
	}

	setVndbCredentials():void {
		localStorage.setItem('vndb_user', this.vndb.username);
		localStorage.setItem('vndb_pass', this.vndb.password);
		localStorage.setItem('vndb_toggle', "1");
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

	toggleVndbCredentials():void {
		if(!localStorage.getItem('vndb_toggle').length || localStorage.getItem('vndb_toggle') == "0") {
			localStorage.setItem('vndb_toggle', "1");
			console.log('VNDB auto-update is set to on');
		}
		else {
			localStorage.setItem('vndb_toggle', "0");
			console.log('VNDB auto-update is set to off');
		}
	}

	vndbToggleStatus = ():any => {
		return localStorage.getItem('vndb_toggle') == "1" ? 'on' : 'off';
	}

}
