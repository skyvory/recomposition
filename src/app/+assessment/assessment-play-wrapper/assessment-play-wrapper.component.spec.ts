import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPlayWrapperComponent } from './assessment-play-wrapper.component';

describe('AssessmentPlayWrapperComponent', () => {
  let component: AssessmentPlayWrapperComponent;
  let fixture: ComponentFixture<AssessmentPlayWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentPlayWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentPlayWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
