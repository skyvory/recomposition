import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VnComponent } from './vn.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { VnRoutingModule } from './vn-routing.module';
import { Ng2PaginationModule } from 'ng2-pagination';
import { VnAssessmentComponent } from './vn-assessment.component';
import { VnCharacterComponent } from './+vn-character/vn-character.component';
import { VnFillComponent } from './vn-fill.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
Ng2PaginationModule,
    FormsModule,
    VnRoutingModule
  ],
  declarations: [VnComponent, VnAssessmentComponent, VnCharacterComponent, VnFillComponent]
})
export class VnModule { }
