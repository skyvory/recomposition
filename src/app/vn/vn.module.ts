import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from '../mymaterial.module';
import { VnRoutingModule } from './vn-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';


import { VnComponent } from './vn.component';
// import { Ng2PaginationModule } from 'ng2-pagination';
import { VnFillComponent } from './vn-fill/vn-fill.component';
import { AssessmentListDialog } from '../assessment/assessment-list-dialog/assessment-list-dialog';
import { VnResolve } from '../vn.resolve';
import { VnScreenshotComponent } from './vn-screenshot/vn-screenshot.component';
// import { Ng2FileDropModule } from 'ng2-file-drop';
import { FileUploadModule } from 'ng2-file-upload';
import { PortalSearchDialog } from './portal-search-dialog/portal-search-dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FlexLayoutModule,
    VnRoutingModule,
    // Ng2PaginationModule,
    // Ng2FileDropModule,
    FileUploadModule,
  ],
  declarations: [
    VnComponent,
    VnFillComponent,
    PortalSearchDialog,
    VnScreenshotComponent,
    AssessmentListDialog
  ],
  entryComponents: [
    AssessmentListDialog,
    PortalSearchDialog
  ],
  providers: [
    VnResolve
  ]
})
export class VnModule { }
