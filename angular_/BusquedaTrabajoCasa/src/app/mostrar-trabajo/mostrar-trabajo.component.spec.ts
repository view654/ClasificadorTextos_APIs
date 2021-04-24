import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTrabajoComponent } from './mostrar-trabajo.component';

describe('MostrarTrabajoComponent', () => {
  let component: MostrarTrabajoComponent;
  let fixture: ComponentFixture<MostrarTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
