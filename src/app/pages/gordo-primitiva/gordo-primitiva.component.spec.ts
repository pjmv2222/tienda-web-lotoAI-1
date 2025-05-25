import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GordoPrimitivaComponent } from './gordo-primitiva.component';

describe('GordoPrimitivaComponent', () => {
  let component: GordoPrimitivaComponent;
  let fixture: ComponentFixture<GordoPrimitivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GordoPrimitivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GordoPrimitivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
