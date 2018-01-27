import { Component, OnInit } from '@angular/core';
// import { ToastService } from '../toaster/toast.service';
import { SettingService } from '../service/setting.service';
import { TwitterService } from '../service/twitter.service';
import { AuthenticationService } from '../authentication.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/finally';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		// private toast:ToastService,
		private settingService:SettingService,
		private twitterService:TwitterService,
		private authenticationService:AuthenticationService
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

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
		this.vndb.password = '';
	}

	setVndbCredentials():void {
		this.settingService.saveVndbCredentials(this.vndb.username, this.vndb.password).subscribe(response => {
			localStorage.setItem('vndb_toggle', "1");
			// this.toast.pop("VNDB credential set");
		});
		
	}

	checkVndbCredentials():void {
		let u = localStorage.getItem('vndb_user_hash');
		let p = localStorage.getItem('vndb_pass_hash');
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
			// this.toast.pop('VNDB auto-update is set to on');
		}
		else {
			localStorage.setItem('vndb_toggle', "0");
			// this.toast.pop('VNDB auto-update is set to off');
		}
	}

	vndbToggleStatus = ():any => {
		return localStorage.getItem('vndb_toggle') == "1" ? 'on' : 'off';
	}

	connectTwitter():void {
		// let token = localStorage.getItem('recomposition_token');
		let token = this.authenticationService.token;
		window.open("http://127.0.0.1/record/public/twitterauth/login?token=" + token, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
	}

}
