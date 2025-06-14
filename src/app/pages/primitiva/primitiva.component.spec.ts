import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitivaComponent } from './primitiva.component';

describe('PrimitivaComponent', () => {
  let component: PrimitivaComponent;
  let fixture: ComponentFixture<PrimitivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimitivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
