import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDemandeComponent } from './ajout-demande.component';

describe('AjoutDemandeComponent', () => {
  let component: AjoutDemandeComponent;
  let fixture: ComponentFixture<AjoutDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
