import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemandeTirageComponent} from './demande-tirage.component';

describe('DemandeTirageComponent', () => {
  let component: DemandeTirageComponent;
  let fixture: ComponentFixture<DemandeTirageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeTirageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeTirageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
