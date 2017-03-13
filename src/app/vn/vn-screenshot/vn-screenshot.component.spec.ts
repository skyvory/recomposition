/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VnScreenshotComponent } from './vn-screenshot.component';

describe('VnScreenshotComponent', () => {
  let component: VnScreenshotComponent;
  let fixture: ComponentFixture<VnScreenshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnScreenshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VnScreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
