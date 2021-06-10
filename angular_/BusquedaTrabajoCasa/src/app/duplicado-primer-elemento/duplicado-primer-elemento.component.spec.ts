import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicadoPrimerElementoComponent } from './duplicado-primer-elemento.component';

describe('DuplicadoPrimerElementoComponent', () => {
  let component: DuplicadoPrimerElementoComponent;
  let fixture: ComponentFixture<DuplicadoPrimerElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicadoPrimerElementoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicadoPrimerElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
