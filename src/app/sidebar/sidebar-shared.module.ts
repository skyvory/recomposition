import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    routing
  ],
  declarations: [SidebarComponent],
  exports: [
      SidebarComponent
  ]
    
})
export class SidebarsharedModule { }
