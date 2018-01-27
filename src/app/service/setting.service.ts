import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { AuthenticationService } from '../authentication.service';
import { Constant } from '../const.config';

@Injectable()
export class SettingService {
	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) {}

	saveVndbCredentials(username:string, password:string):Observable<any> {
    let base64Username = window.btoa(username);
    let base64Password = window.btoa(password);
    let data = JSON.stringify({
      vndb_username: base64Username,
      vndb_password: base64Password
    });
    return this.http.post(Constant.API_PATH + `setting/vndb`, data, this.authenticationService.option)
      .map(
        (response:any) => {
          let data = response.data;
          localStorage.setItem('vndb_user', username);
          localStorage.setItem('vndb_user_hash', data.username);
          localStorage.setItem('vndb_pass_hash', data.password);
          return data;
        }
      )
    ;
	}

}