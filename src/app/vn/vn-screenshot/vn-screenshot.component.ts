import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';
import { FileUploadService } from '../../file-upload.service';
// import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-vn-screenshot',
  templateUrl: './vn-screenshot.component.html',
  styleUrls: ['./vn-screenshot.component.css']
})
export class VnScreenshotComponent implements OnInit {

  constructor(
    public router: Router,
    private vnService: VnService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.loadVn(id);
  }

  vn:any;
  loadVn(id:number):void {
		this.vnService.getVn(id).subscribe(response => {
			this.vn = response.data;
		});
	}

  fileChange(event) {
    console.log(event);
    
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.fileUploadService.uploadScreenshots(this.vn.id, 1, file).subscribe(response => {
        console.log(response);
      });
    }
  }

  public uploader:FileUploader = this.fileUploadService.uploadInstance;
  public hasBaseDropZoneOver:boolean = false;
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  // DEPRECATED!
  // uploadItem(item):void {
  //   console.log(item);
  //   this.fileUploadService.uploadScreenshots(item._file).subscribe(response => {
  //     console.log("end transmission");
  //   });
  // }

  dropTrigger(event, category):void {
    // console.info(ev);
    let droppedFiles = event.dataTransfer.files;
    for(let i = 0; i < droppedFiles.length; i++) {
      // console.log(ev.dataTransfer.files[i]);
      this.fileUploadService.uploadScreenshots(this.vn.id,category, droppedFiles[i]).subscribe(response => {
        console.log("RESPONSE", response);
      });
    }
    // console.log(ev.dataTransfer.files);
  }

  

}
