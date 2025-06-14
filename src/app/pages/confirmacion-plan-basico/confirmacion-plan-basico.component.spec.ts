import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPlanBasicoComponent } from './confirmacion-plan-basico.component';

describe('ConfirmacionPlanBasicoComponent', () => {
  let component: ConfirmacionPlanBasicoComponent;
  let fixture: ComponentFixture<ConfirmacionPlanBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionPlanBasicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionPlanBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
