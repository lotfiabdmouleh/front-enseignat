import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgenttirageComponent} from './agenttirage.component';

describe('AgenttirageComponent', () => {
  let component: AgenttirageComponent;
  let fixture: ComponentFixture<AgenttirageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenttirageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenttirageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
