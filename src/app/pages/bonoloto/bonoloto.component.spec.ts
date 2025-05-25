import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonolotoComponent } from './bonoloto.component';

describe('BonolotoComponent', () => {
  let component: BonolotoComponent;
  let fixture: ComponentFixture<BonolotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonolotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonolotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
