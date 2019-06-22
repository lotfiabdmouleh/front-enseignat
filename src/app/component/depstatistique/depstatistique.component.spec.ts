import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DepstatistiqueComponent} from './depstatistique.component';

describe('DepstatistiqueComponent', () => {
  let component: DepstatistiqueComponent;
  let fixture: ComponentFixture<DepstatistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepstatistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepstatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
