import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class TwitterService {
	constructor(
		private http: Http,
		private authenticationService: AuthenticationService
	) {}

  postStatus(status):Observable<any> {
    let data = JSON.stringify({
      status: status
    });
    return this.http.post(Constant.API_PATH + `twitter/status`, data, this.authenticationService.option)
      .map(
        (response:Response) => {
          return response.json().data;
        }
      )
  }

}