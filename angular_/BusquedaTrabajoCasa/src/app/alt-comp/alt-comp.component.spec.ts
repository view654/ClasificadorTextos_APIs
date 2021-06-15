import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltCompComponent } from './alt-comp.component';

describe('AltCompComponent', () => {
  let component: AltCompComponent;
  let fixture: ComponentFixture<AltCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
