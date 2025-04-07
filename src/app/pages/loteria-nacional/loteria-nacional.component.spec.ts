import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteriaNacionalComponent } from './loteria-nacional.component';

describe('LoteriaNacionalComponent', () => {
  let component: LoteriaNacionalComponent;
  let fixture: ComponentFixture<LoteriaNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteriaNacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteriaNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
