import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VnComponent } from './vn.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { VnRoutingModule } from './vn-routing.module';
import { Ng2PaginationModule } from 'ng2-pagination';
import { VnFillComponent } from './vn-fill/vn-fill.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssessmentListDialog } from './assessment-list-dialog';
import { SidebarsharedModule } from '../sidebar/sidebar-shared.module';
import { VnResolve } from '../vn.resolve';
import { VnScreenshotComponent } from './vn-screenshot/vn-screenshot.component';
// import { Ng2FileDropModule } from 'ng2-file-drop';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    Ng2PaginationModule,
    FormsModule,
    VnRoutingModule,
    FlexLayoutModule,
    SidebarsharedModule,
    // Ng2FileDropModule,
    FileUploadModule,
    BrowserAnimationsModule
  ],
  declarations: [VnComponent, VnFillComponent, AssessmentListDialog, VnScreenshotComponent],
  entryComponents: [
    AssessmentListDialog
  ],
  providers: [
    VnResolve
  ]
})
export class VnModule { }
