import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePlusIconComponent } from './circle-plus-icon.component';

describe('CirclePlusIconComponent', () => {
  let component: CirclePlusIconComponent;
  let fixture: ComponentFixture<CirclePlusIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CirclePlusIconComponent]
    });
    fixture = TestBed.createComponent(CirclePlusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
