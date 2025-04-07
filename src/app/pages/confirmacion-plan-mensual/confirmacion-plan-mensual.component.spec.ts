import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPlanMensualComponent } from './confirmacion-plan-mensual.component';

describe('ConfirmacionPlanMensualComponent', () => {
  let component: ConfirmacionPlanMensualComponent;
  let fixture: ComponentFixture<ConfirmacionPlanMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionPlanMensualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionPlanMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
