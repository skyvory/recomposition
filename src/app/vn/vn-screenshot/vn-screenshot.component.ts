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
  }

  private supportedFileTypes: string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'];

  // private dragFileAccepted(acceptedFile:Ng2FileDropAcceptedFile) {
  //   console.log("ACCEPT", acceptedFile);
  //   // Load the image
  //   let fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     console.log("result", fileReader.result);
  //   };

  //   fileReader.readAsDataURL(acceptedFile.file);
  // }

  fileChange(event) {
    console.log(event);

    
    
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.fileUploadService.doUpload(file).subscribe(response => {
        console.log(response);
      });
    }
  }

  public uploader:FileUploader = this.fileUploadService.uploadInstance;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  uploadItem(item):void {
    console.log(item);
    this.fileUploadService.doUpload(item._file).subscribe(response => {
      console.log("end transmission");
    });
  }
  dropTrigger(ev):void {
    console.info(ev);
    // ev.dataTransfer.files[0]
  }

  

}
