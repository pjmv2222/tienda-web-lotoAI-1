import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibilidadComponent } from './accesibilidad.component';

describe('AccesibilidadComponent', () => {
  let component: AccesibilidadComponent;
  let fixture: ComponentFixture<AccesibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesibilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
