import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquegeneralComponent } from './historiquegeneral.component';

describe('HistoriquegeneralComponent', () => {
  let component: HistoriquegeneralComponent;
  let fixture: ComponentFixture<HistoriquegeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquegeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquegeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
