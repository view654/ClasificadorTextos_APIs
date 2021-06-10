import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalExamenComponent } from './principal-examen.component';

describe('PrincipalExamenComponent', () => {
  let component: PrincipalExamenComponent;
  let fixture: ComponentFixture<PrincipalExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
