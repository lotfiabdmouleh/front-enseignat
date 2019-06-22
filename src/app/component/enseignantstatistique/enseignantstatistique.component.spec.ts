import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnseignantstatistiqueComponent} from './enseignantstatistique.component';

describe('EnseignantstatistiqueComponent', () => {
  let component: EnseignantstatistiqueComponent;
  let fixture: ComponentFixture<EnseignantstatistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantstatistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantstatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
