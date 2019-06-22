import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatierestatistiqueComponent} from './matierestatistique.component';

describe('MatierestatistiqueComponent', () => {
  let component: MatierestatistiqueComponent;
  let fixture: ComponentFixture<MatierestatistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatierestatistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatierestatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
