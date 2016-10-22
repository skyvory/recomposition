import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from './common/headers';

@Component({
	selector: 'my-login',
	templateUrl: 'recomposition/app/login.component.html',
})

export class LoginComponent implements OnInit {
	constructor(public router: Router, public http: Http) {}
	
	login(event:any, username:any, password:any) {
		event.preventDefault();
		let body = JSON.stringify({ username, password });
		this.http.post('http://localhost/record/public/api/authenticate', body, { headers: contentHeaders })
			.subscribe(response => {
				localStorage.setItem('id_token', response.json().token);
				this.router.navigate(['/home']);
			}, error => {
				console.log("ERROR", error.text());
			});
	}

	signup(event:any) {
		// event.preventDefault();
		// this.router.navigate(['/signup']);
	}
	
	title = "Login pose";
	ngOnInit() {
		console.log("no login yet");
	}
}