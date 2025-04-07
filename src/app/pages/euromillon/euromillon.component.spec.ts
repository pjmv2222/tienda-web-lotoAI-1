import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuromillonComponent } from './euromillon.component';

describe('EuromillonComponent', () => {
  let component: EuromillonComponent;
  let fixture: ComponentFixture<EuromillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EuromillonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EuromillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
