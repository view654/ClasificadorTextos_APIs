import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimercomponenteoldComponent } from './primercomponenteold.component';

describe('PrimercomponenteoldComponent', () => {
  let component: PrimercomponenteoldComponent;
  let fixture: ComponentFixture<PrimercomponenteoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimercomponenteoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimercomponenteoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
