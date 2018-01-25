import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { contentHeaders } from './common/headers';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class FileUploadService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  // ng2-file-upload option variable
  options = {
    url: Constant.API_PATH + 'vn/screenshot',
    authToken: this.authenticationService.authorization_bearer,
  };
  
  // Prepare object of ng2-file-uploader to be used in component
  public uploadInstance: FileUploader = new FileUploader(this.options);

  uploadScreenshots(vn_id:number, screen_category:number, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('screenshot', file);
    formData.append('vn_id', vn_id.toString());
    formData.append('screen_category', screen_category.toString());
    // formData.append('file[]', file, file.name);
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');

    return Observable.fromPromise(new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
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
