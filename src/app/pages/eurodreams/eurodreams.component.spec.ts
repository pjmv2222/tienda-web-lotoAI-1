import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EurodreamsComponent } from './eurodreams.component';

describe('EurodreamsComponent', () => {
  let component: EurodreamsComponent;
  let fixture: ComponentFixture<EurodreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EurodreamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EurodreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
