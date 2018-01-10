import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
	selector: 'login-selector',
	templateUrl: './login.component.html',
	// styleUrls: ['./login.component.css'],
	providers: [AuthenticationService],
})

export class LoginComponent implements OnInit {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
	) { }

	timeout:any;

	ngOnInit() {
		this.preAuth();
	}


	login(event: any, username: any, password: any) {
		event.preventDefault();
		this.authenticationService.login(username, password)
			.subscribe(result => {
				if (result === true) {
					this.router.navigate(['/home']);
				}
				else {
					console.log("ERROR LOGIN");
				}
			});
	}

	preAuth(): void {
		if (this.authenticationService.isTokenReady()) {
			this.authenticationService.isJwtTokenValid().subscribe(response => {
				if (response === true) {
					this.router.navigate(['/home']);
				}
			},
				error => {
					console.log("Token error", error);
				});
		}
	}

}