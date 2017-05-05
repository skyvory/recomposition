import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastService } from '../toaster/toast.service';
import { trigger, state, animate, transition, style } from '@angular/animations';
import * as THREE from 'three';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

// import { Http, Headers } from '@angular/http';
// import { contentHeaders } from './common/headers';

@Component({
	// moduleId: module.id,
	selector: 'login-selector',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AuthenticationService],
	animations: [
		trigger('shardState', [
			state('inactive', style({
				opacity: '0',
			})),
			state('active', style({
				opacity: '1',
			})),
			transition('inactive => active', animate('5000ms ease-in')),
			transition('active => inactive', animate('300ms ease-out'))
		]),
		trigger('activationState', [
			state('enter', style({
				transform: 'scale(1)',
			})),
			state('leave', style({
				transform: 'scale(0)',
			})),
			transition('leave => enter', animate('2000ms ease-in')),
			transition('enter => leave', animate('2000ms ease-out'))
		])
	]
})

export class LoginComponent implements OnInit {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private toast: ToastService,
		@Inject(DOCUMENT) private document:any
	) {}

	ngOnInit() {
		//this.authenticationService.logout();
		this.preAuth();
		this.loopCast();
		// this.shardSequenceActivation();
		this.init();
		this.anima();
		this.cre();
	}

	loginAccessVisibility:string = "visible";
	
	stateOfShard1:string = "inactive";
	stateOfShard2:string = "inactive";
	stateOfShard3:string = "inactive";

	par:any = '50%';

	shardSequenceActivation():void {
		if(this.stateOfShard1 == 'active' || this.stateOfShard2 == 'active' || this.stateOfShard3 == 'active') {
			this.stateOfShard1 = 'inactive';
			this.stateOfShard2 = 'inactive';
			this.stateOfShard3 = 'inactive';
		}
		else {
			setTimeout(() => {
				this.stateOfShard1 = 'active';
			}, 3000);
			setTimeout(() => {
				this.stateOfShard2 = 'active';
			}, 5000);
			setTimeout(() => {
				this.stateOfShard3 = 'active';
			}, 8000);
		}
	}

	stateOfForm:string = 'leave';

	toggleFormState():void {
		this.stateOfForm = this.stateOfForm == 'enter' ? 'leave' : 'enter';
		this.shardSequenceActivation();
		this.loginAccessVisibility = 'hidden';
	}

	bg1style:any = '';
	bg2style:any = '';
	bg3style:any = '';
	bg1position:number = 0;
	bg2position:number = 0;
	bg3position:number = 0;

	loopCast():void {
		if(true === true)
			return;
		setInterval(() => {
			this.bg1position += 2;
			this.bg1style = this.bg1position+"px bottom";
			this.bg2position += 1;
			this.bg2style = this.bg2position+"px bottom";
			this.bg3position += 0.7;
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



	camera:any;
	scene:any;
	renderer:any;
	geometry:any;
	material:any;
	mesh:any;

	init():void {
		this.camera = new THREE.PerspectiveCamera(75, 800/600, 1, 10000);
		this.camera.position.z = 1000;
		this.scene = new THREE.Scene();
		this.geometry = new THREE.BoxGeometry(200, 200, 200);
		this.material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(800,600);
		this.document.body.appendChild(this.renderer.domElement);

	}

anima = () => {
	window.requestAnimationFrame(this.anima);
		// requestAnimationFrame(animate);
		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.02;
		this.renderer.render(this.scene, this.camera);
}

	// anima():void {
	// 	window.requestAnimationFrame(this.anima);
	// 	// requestAnimationFrame(animate);
	// 	this.mesh.rotation.x += 0.01;
	// 	this.mesh.rotation.y += 0.02;
	// 	this.renderer.render(this.scene, this.camera);
	// }


		particleCount:number = 1800;
	particles:any = new THREE.Geometry();
	pMaterial:any = new THREE.PointsMaterial({
		color: 0xFFFFFF,
		size: 20
	});

	cre():void {
		for(let p = 0; p < this.particleCount; p++) {
			let pX = Math.random() * 500 - 250;
			let pY = Math.random() * 500 - 250;
			let pZ = Math.random() * 500 - 250;
			let particle = new THREE.Vertex(
				new THREE.Vector3(pX, pY, pZ)
			);

			this.particles.vertices.push(particle);
		}

		let particleSystem = new THREE.ParticleSystem(this.particles, this.pMaterial);

		this.scene.addChild(particleSystem);
	}


}