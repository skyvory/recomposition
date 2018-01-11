/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VnComponent } from './vn.component';

describe('VnComponent', () => {
  let component: VnComponent;
  let fixture: ComponentFixture<VnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
