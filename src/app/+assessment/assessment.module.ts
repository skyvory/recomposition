import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AssessmentFillComponent } from './assessment-fill.component';
import { AssessmentCharacterComponent } from './assessment-character/assessment-character.component';
import { AssessmentWrapperComponent } from './assessment-wrapper/assessment-wrapper.component';
import { AssessmentFillWrapperComponent } from './assessment-fill-wrapper/assessment-fill-wrapper.component';
import { AssessmentCharacterWrapperComponent } from './assessment-character-wrapper/assessment-character-wrapper.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarsharedModule } from '../sidebar/sidebar-shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
Ng2PaginationModule,
    FormsModule,
    AssessmentRoutingModule,
    SidebarsharedModule,
    FileUploadModule,
    ClipboardModule
  ],
  declarations: [AssessmentComponent, AssessmentFillComponent, AssessmentCharacterComponent, AssessmentWrapperComponent, AssessmentFillWrapperComponent, AssessmentCharacterWrapperComponent]
})
export class AssessmentModule { }
