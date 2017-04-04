import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastService } from './toaster/toast.service';


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