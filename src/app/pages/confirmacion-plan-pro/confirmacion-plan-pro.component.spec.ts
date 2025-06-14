import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPlanProComponent } from './confirmacion-plan-pro.component';

describe('ConfirmacionPlanProComponent', () => {
  let component: ConfirmacionPlanProComponent;
  let fixture: ComponentFixture<ConfirmacionPlanProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionPlanProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionPlanProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
