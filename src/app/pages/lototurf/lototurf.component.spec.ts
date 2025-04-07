import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LototurfComponent } from './lototurf.component';

describe('LototurfComponent', () => {
  let component: LototurfComponent;
  let fixture: ComponentFixture<LototurfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LototurfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LototurfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
