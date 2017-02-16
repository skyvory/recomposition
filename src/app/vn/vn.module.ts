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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    Ng2PaginationModule,
    FormsModule,
    VnRoutingModule,
    FlexLayoutModule.forRoot(),
    SidebarsharedModule
  ],
  declarations: [VnComponent, VnFillComponent, AssessmentListDialog],
  entryComponents: [
    AssessmentListDialog
  ],
  providers: [
    VnResolve
  ]
})
export class VnModule { }
