import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateUpdateComponent } from './create-update.component';

describe('CrateUpdateComponent', () => {
  let component: CrateUpdateComponent;
  let fixture: ComponentFixture<CrateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrateUpdateComponent]
    });
    fixture = TestBed.createComponent(CrateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
