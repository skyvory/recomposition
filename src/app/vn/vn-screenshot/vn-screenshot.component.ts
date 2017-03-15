import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VnService } from '../../vn.service';
import { FileUploadService } from '../../file-upload.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-vn-screenshot',
  templateUrl: './vn-screenshot.component.html',
  styleUrls: ['./vn-screenshot.component.css']
})
export class VnScreenshotComponent implements OnInit {

  constructor(
    private vnService: VnService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.loadVn(id);
    this.loadScreenshots(id);
  }

  vn:any = {};
  loadVn(id:number):void {
		this.vnService.getVn(id).subscribe(response => {
			this.vn = response.data;
		});
	}

  // fileChange(event) {
  //   let fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     this.fileUploadService.uploadScreenshots(this.vn.id, 1, file).subscribe(response => {
  //       console.log(response);
  //     });
  //   }
  // }

  public uploader:FileUploader = this.fileUploadService.uploadInstance;
  public hasBaseDropZoneOver:boolean = false;
  public fileOverBase(e:any, cat):void {
    this.hasBaseDropZoneOver = e ? cat : e;
  }

  screenshots:any = [];

  loadScreenshots(vn_id:number):void {
    this.vnService.getScreenshots(vn_id).subscribe(response => {
      this.screenshots = response.data;
    });
  }

  uploadQueue:any = [];
  isNowUploading:boolean = false;

  dropTrigger(event, category):void {
    let droppedFiles = event.dataTransfer.files;
    for(let i = 0; i < droppedFiles.length; i++) {
      let itemToQueue = {
        vn_id: this.vn.id,
        category: category,
        file: droppedFiles[i]
      };
      console.log("ITEM TO QUEUE", itemToQueue);
      this.uploadQueue.push(itemToQueue);
    }

    if(!this.isNowUploading) {
      this.isNowUploading = true;
      this.fireUpload();
    }
  }

  fireUpload():void {
    if(this.uploadQueue.length > 0) {
      let firstServe = this.uploadQueue[Object.keys(this.uploadQueue)[0]];
      if(firstServe) {
        this.fileUploadService.uploadScreenshots(firstServe.vn_id, firstServe.category, firstServe.file).subscribe(response => {
          this.screenshots.push(response.data);
          let index = this.uploadQueue.indexOf(firstServe);

          // Indexing stability trial to test integrity of index between Object.keys and indexOf
          if(JSON.stringify(firstServe) === JSON.stringify(this.uploadQueue[Object.keys(this.uploadQueue)[index]]))
            console.log("INDEX STABILITY TRIAL", true, "with index", index);
          else
            console.warn("INDEX STABILITY TRIAL", false, "indexOf vs Object.keys return diverse result");
          // End block of index stability trial

          this.uploadQueue.splice(index, 1);

          // Recurse upload for next queue
          if(this.uploadQueue.length > 0) {
            this.fireUpload();
          }
        });
      }
    }
  }

  deleteScreenshot(screenshot:any):void {
    this.vnService.deleteScreenshot(screenshot.id).subscribe(response => {
      let index = this.screenshots.indexOf(screenshot);
      this.screenshots.splice(index, 1);
    });
  }

  updateScreenshot(screenshot:any):void {
    console.log(screenshot);
    this.vnService.updateScreenshot(screenshot).subscribe(response => {
      console.log("update success");
    });
  }

}
