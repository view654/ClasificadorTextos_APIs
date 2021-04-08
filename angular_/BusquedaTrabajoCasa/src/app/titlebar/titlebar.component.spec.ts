import { ComponentFixture, TestBed } from '@angular/core/testing';

import { titlebar } from './titlebar.component';

describe('TitleBarComponent', () => {
  let component: titlebar;
  let fixture: ComponentFixture<titlebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ titlebar ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(titlebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
