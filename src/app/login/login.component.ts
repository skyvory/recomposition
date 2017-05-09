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
		@Inject(DOCUMENT) private document: any
	) { }

	ngOnInit() {
		//this.authenticationService.logout();
		this.preAuth();
		this.loopCast();
		// this.shardSequenceActivation();
		this.init();
		this.animate();
	}

	loginAccessVisibility: string = "visible";

	stateOfShard1: string = "inactive";
	stateOfShard2: string = "inactive";
	stateOfShard3: string = "inactive";

	par: any = '50%';

	shardSequenceActivation(): void {
		if (this.stateOfShard1 == 'active' || this.stateOfShard2 == 'active' || this.stateOfShard3 == 'active') {
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

	stateOfForm: string = 'leave';

	toggleFormState(): void {
		this.stateOfForm = this.stateOfForm == 'enter' ? 'leave' : 'enter';
		this.shardSequenceActivation();
		this.loginAccessVisibility = 'hidden';
	}

	bg1style: any = '';
	bg2style: any = '';
	bg3style: any = '';
	bg1position: number = 0;
	bg2position: number = 0;
	bg3position: number = 0;

	loopCast(): void {
		if (true === true)
			return;
		setInterval(() => {
			this.bg1position += 2;
			this.bg1style = this.bg1position + "px bottom";
			this.bg2position += 1;
			this.bg2style = this.bg2position + "px bottom";
			this.bg3position += 0.7;
			this.bg3style = this.bg3position + "px bottom";

			if (this.bg1position > 795) {
				this.bg1position = 0;
			}
			if (this.bg2position > 778) {
				this.bg2position = 0;
			}
			if (this.bg3position > 962) {
				this.bg3position = 0;
			}
		}, 70);
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
			this.toast.pop("Logging you in automatically...");
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




	camera: any;
	scene: any;
	renderer: any;
	particles: any;
	geometry: any;
	materials: any = [];
	parameters:any;
	i:any;
	h:any;
	color:any;
	sprite:any;
	size:any;
	mouseX:any = 0;
	mouseY:any = 0;

	windowHalfX:any = window.innerWidth / 2;
	windowHalfY:any = window.innerHeight / 2;


	posix:any = 20;
	posiy:any = -230;
	poziz:any = 0;
	rotax:any = 7.7;
	rotay:any = 3;
	rotaz:any = 0;

	init(): void {
		// let container = document.createElement('div');
		let container = document.getElementById('eye-field');
		document.body.appendChild(container);

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
		// this.camera.position.z = 900;
		this.scene = new THREE.Scene();
		// this.scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
		this.geometry = new THREE.Geometry();
		var textureLoader = new THREE.TextureLoader();

		let sprite1 = textureLoader.load('assets/images/snowflake.png')
		let sprite2 = textureLoader.load('assets/images/snowflakes_PNG7585.png')

		for(let i = 0; i < 10000; i++) {
			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2000 - 1000;
			vertex.y = Math.random() * 2000 - 1000;
			vertex.z = Math.random() * 2000 - 1000;

			this.geometry.vertices.push(vertex);
		}

		this.parameters = [
					[ [0.90, 0.05, 0.5], sprite1, 10 ],
					[ [1.0, 0.2, 0.5], sprite2, 20 ]
		];

		for(let i = 0; i < this.parameters.length; i++) {
			let color = this.parameters[i][0];
			let sprite = this.parameters[i][1];
			let size = this.parameters[i][2];

			this.materials[i] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest:false, transparent: true } );
			this.materials[i].color.setHSL(color[0], color[1], color[2]);

			this.particles = new THREE.Points(this.geometry, this.materials[i]);
			this.particles.rotation.x = Math.random() * 6;
			this.particles.rotation.y = Math.random() * 6;
			this.particles.rotation.z = Math.random() * 6;

			this.scene.add(this.particles);
		}

		let canvas = document.getElementById('three');
		this.renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true, antialias: true});
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.setClearColor(0x000000, 0);
	container.appendChild(this.renderer.domElement);

	// document.addEventListener('mousemove', this.onDocumentMouseMove, false);
}

onDocumentMouseMove(event) {
	this.mouseX = event.clientX - this.windowHalfX;
	this.mouseY = event.clientY - this.windowHalfY;
}

animate = () => {
	requestAnimationFrame(this.animate);
	this.render();
}

render():void {
	var time = Date.now() * 0.00005;

	// this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
	// this.camera.position.y +=  ( - this.mouseY - this.camera.position.y ) * 0.05;
		this.camera.position.x = 20;
		this.camera.position.y = -230;
		this.camera.position.z = 0;
		this.camera.rotation.x = 7.7;
		this.camera.rotation.y = 3;
		this.camera.rotation.z = 0;

	// this.camera.lookAt(this.scene.position);
	for(let i = 0; i<this.scene.children.length;i++) {
		var object = this.scene.children[i];
		if(object instanceof THREE.Points) {
			object.rotation.x = - time * (i<4 ? i+1 : -(i+1) );
		}
	}

	for(let i=0;i<this.materials.length;i++) {
		this.color = this.parameters[i][0];
		this.h = (360*(this.color[0] + time) % 360 ) / 360;
		this.materials[i].color.setHSL(this.h, this.color[1], this.color[2]);
	}

	this.renderer.render(this.scene, this.camera);
}



}