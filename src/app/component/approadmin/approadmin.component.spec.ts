import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApproadminComponent} from './approadmin.component';

describe('ApproadminComponent', () => {
  let component: ApproadminComponent;
  let fixture: ComponentFixture<ApproadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
