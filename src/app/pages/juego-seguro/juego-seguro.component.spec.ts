import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoSeguroComponent } from './juego-seguro.component';

describe('JuegoSeguroComponent', () => {
  let component: JuegoSeguroComponent;
  let fixture: ComponentFixture<JuegoSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoSeguroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
