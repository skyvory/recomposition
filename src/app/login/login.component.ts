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
		// this.anima();
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
	geometry: any;
	material: any;
	mesh: any;

	view_angle: any = 60;
	aspect: any = 800 / 600;
	near: any = 0.1;
	// near: any = 90.1;
	far: any = 10000;

	particleCount: number = 180;
	particles: any = new THREE.Geometry();
	loader:any = new THREE.TextureLoader();
	pMaterial: any = new THREE.PointsMaterial({
		color: 0xFFFFFF,
		size: 20,
		map: this.loader.load(
			"assets/images/particle.png"
		),
		blending: THREE.AdditiveBlending,
		transparent: true
	});
	// pMaterial: any = new THREE.ParticleBasicMaterial({
	// 	color: 0xFFFFFF,
	// 	size: 20,
	// 	map: THREE.ImageUtils.loadTexture(
	// 		"assets/images/particle.png"
	// 	),
	// 	blending: THREE.AdditiveBlending,
	// 	transparent: true
	// });

	// shit:any = new THREE.TextureLoader(
	// 	"../assets/images/particle.png"
	// );
	// crap:any = new THREE.ImageUtils.loadTexture("../assets/images/particles.png");

	particleSystem: any;

	init(): void {
		// console.log("OH", this.shit, 'is', this.crap);
		this.renderer = new THREE.WebGLRenderer();
		this.camera = new THREE.PerspectiveCamera(this.view_angle, this.aspect, this.near, this.far);
		this.scene = new THREE.Scene();
		this.camera.position.z = 40;
		// this.camera.position.z = 140;
		this.renderer.setClearColor(new THREE.Color(0.1));
		this.renderer.setSize(800, 600);

		this.document.body.appendChild(this.renderer.domElement);


		for (let p = 0; p < this.particleCount; p++) {
			let pX = Math.random() * 500 - 250;
			let pY = Math.random() * 500 - 250;
			let pZ = Math.random() * 500 - 250;
			let particle = new THREE.Vector3(pX, pY, pZ);
			// let particle = new THREE.Vertex(
			// 	new THREE.Vector3(pX, pY, pZ)
			// );

			particle.velocity = new THREE.Vector3(
				0,
				-Math.random(),
				0);

			this.particles.vertices.push(particle);
		}
		this.particleSystem = new THREE.Points(this.particles, this.pMaterial);
		this.particleSystem.sortParticles = true;
		console.log(this.particleSystem);

		// this.scene.addChild(this.particleSystem);
		this.scene.add(this.particleSystem);

		// let geometry = new THREE.BoxGeometry( 200, 200, 200 );
	// let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
// this.mesh = new THREE.Mesh( geometry, material );
	// this.scene.add( this.mesh );

		this.anima();
	}


aaa:boolean = true;
	anima = () => {
		// this.mesh.rotation.x += 0.01;
	// this.mesh.rotation.y += 0.02;
		
		this.particleSystem.rotation.x += 0.01;
		// this.particleSystem.rotation.y += 0.01;
		// this.particleSystem.rotateX(0.002);
		// this.particleSystem.rotateY(3);

		var pCount = this.particleCount;
		// let particle:any;
			// particle = this.particles.vertices;
			// console.log(particle);
// console.log(this.particles.vertices[0]);
		while (pCount--) {
			// var particle = this.particles.vertices[pCount];

			// if (particle.y < -200) {
			// 	particle.y = 200;
			// 	particle.velocity.y = 0;
			// }

			// particle.velocity.y -= Math.random() * .1;

			// particle.add(particle.velocity);
			
			// if(this.aaa) {
			// 	console.log(particle);
			// 	this.aaa = false;
			// }

			// particle.addSelf(particle.velocity);

			if(this.particles.vertices[pCount].x > 600) {
				this.particles.vertices[pCount].y = 200;
				this.particles.vertices[pCount].velocity.y = 0;
			}
			this.particles.vertices[pCount].velocity.y -= Math.random()*.1;

			this.particles.vertices[pCount].add(this.particles.vertices[pCount].velocity);
		}
		this.particleSystem.geometry.__dirtyVertices = true;
		this.renderer.render(this.scene, this.camera);

		window.requestAnimationFrame(this.anima);
	}

	// anima():void {
	// 	window.requestAnimationFrame(this.anima);
	// 	// requestAnimationFrame(animate);
	// 	this.mesh.rotation.x += 0.01;
	// 	this.mesh.rotation.y += 0.02;
	// 	this.renderer.render(this.scene, this.camera);
	// }


	animat(): void {
		// window.requestAnimationFrame = () => {
		// fucking request animation frame or rather fuck angular
		// }
	}





	cre(): void {

	}



}