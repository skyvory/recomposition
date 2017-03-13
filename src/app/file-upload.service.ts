import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { contentHeaders } from './common/headers';
// import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Injectable()
export class FileUploadService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  options = {
    // url: 'vn/screenshot',
    url: Constant.API_PATH + 'vn/screenshot',
    authToken: this.authenticationService.authorization_bearer,
    randomshit: 'jfoijeijwifjejwjf'
  };
  
  public uploadInstance: FileUploader = new FileUploader(this.options);

  uploading():void {
    this.uploadInstance.setOptions(this.options);
  }
  
  doUpload(file: any): Observable<any> {
    console.log("LAUNCH", file);
    let formData: FormData = new FormData();
    formData.append('screenshot', file);
    // formData.append('file[]', file, file.name);
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');

    return Observable.fromPromise(new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', Constant.API_PATH + 'vn/screenshot', true);
      xhr.setRequestHeader('Authorization', this.authenticationService.authorization_bearer);
      xhr.send(formData);
    }));

    // return this.http.post(Constant.API_PATH + `vn/screenshot`, formData, this.authenticationService.optionOnUpload)
    //   .map(res => res.json())
  }

}
