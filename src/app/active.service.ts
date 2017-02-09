import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

@Injectable()
export class ActiveService {
	constructor() {}

	public vn:any = {};
	public assessment:any = {};

}