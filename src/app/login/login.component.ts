import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastService } from '../toaster/toast.service';


// import { Http, Headers } from '@angular/http';
// import { contentHeaders } from './common/headers';

@Component({
	// moduleId: module.id,
	selector: 'login-selector',
	templateUrl: './login.component.html',
	providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private toast: ToastService
	) {}

	ngOnInit() {
		//this.authenticationService.logout();
		this.preAuth();
		this.loopCast();
	}

	bg1style:any = '';
	bg2style:any = '';
	bg3style:any = '';
	bg1position:any = 0;
	bg2position:any = 0;
	bg3position:any = 0;
	loopCast():void {
		setInterval(() => {
			this.bg1position +=2;
			this.bg1style = this.bg1position+"px bottom";
			this.bg2position +=1;
			this.bg2style = this.bg2position+"px bottom";
			this.bg3position +=0.7;
			this.bg3style = this.bg3position+"px bottom";

			if(this.bg1position > 795) {
				this.bg1position = 0;
			}
			if(this.bg2position > 778) {
				this.bg2position = 0;
			}
			if(this.bg3position > 962) {
				this.bg3position = 0;
			}
		},70);
	}

	login(event:any, username:any, password:any) {
		event.preventDefault();
		this.authenticationService.login(username, password)
			.subscribe(result => {
				if(result === true) {
					this.router.navigate(['/home']);
				}
				else {
					console.log("ERROR LOGIN");
				}
			});
	}

	preAuth():void {
		if(this.authenticationService.isTokenReady()) {
			this.toast.pop("Logging you in automatically...");
			this.authenticationService.isJwtTokenValid().subscribe(response => {
				if(response === true) {
					this.router.navigate(['/home']);
				}
			},
			error => {
				console.log("Token error", error);
			});
		}
	}
	
	// login(event:any, username:any, password:any) {
	// 	event.preventDefault();
	// 	let body = JSON.stringify({ username, password });
	// 	this.http.post('http://localhost/record/public/api/authenticate', body, { headers: contentHeaders })
	// 		.subscribe(response => {
	// 			localStorage.setItem('id_token', response.json().token);
	// 			this.router.navigate(['/home']);
	// 		}, error => {
	// 			console.log("ERROR", error.text());
	// 		});
	// }

	// signup(event:any) {
	// 	// event.preventDefault();
	// 	// this.router.navigate(['/signup']);
	// }
	
	title = "Login pose";
}