import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwotPasswordComponent } from './forgot-password.component';

describe('ForwotPasswordComponent', () => {
  let component: ForwotPasswordComponent;
  let fixture: ComponentFixture<ForwotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForwotPasswordComponent]
    });
    fixture = TestBed.createComponent(ForwotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
