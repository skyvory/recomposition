import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'home-selectors',
	template: `
	<md-toolbar>
		<span>
			<a routerLink="/home" routerLinkActive="active">Home</a>
		</span>
		&nbsp;&nbsp;&nbsp;&nbsp;
		<span>
			<a routerLink="/vn" routerLinkActive="active">VN</a>
		</span>
		&nbsp;&nbsp;&nbsp;&nbsp;
		<md-input placeholder="keyword" align="end">
		</md-input>
		<button md-button routerLink="/home" routerLinkActive="active">Search</button>
	</md-toolbar>
	`,
})

export class HomeComponent {}