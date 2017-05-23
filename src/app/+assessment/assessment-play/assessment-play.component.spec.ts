import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPlayComponent } from './assessment-play.component';

describe('AssessmentPlayComponent', () => {
  let component: AssessmentPlayComponent;
  let fixture: ComponentFixture<AssessmentPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
