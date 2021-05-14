import { ComponentFixture, TestBed } from '@angular/core/testing';

import { favoritos } from './favoritos.component';

describe('favoritos', () => {
  let component: favoritos;
  let fixture: ComponentFixture<favoritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ favoritos ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(favoritos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
