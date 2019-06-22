import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InterfaceTirageComponent} from './interface-tirage.component';

describe('InterfaceTirageComponent', () => {
  let component: InterfaceTirageComponent;
  let fixture: ComponentFixture<InterfaceTirageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceTirageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceTirageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
