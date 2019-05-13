import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotocopieurComponent } from './photocopieur.component';

describe('PhotocopieurComponent', () => {
  let component: PhotocopieurComponent;
  let fixture: ComponentFixture<PhotocopieurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotocopieurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotocopieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
