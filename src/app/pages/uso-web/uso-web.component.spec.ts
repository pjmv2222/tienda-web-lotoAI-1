import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoWebComponent } from './uso-web.component';

describe('UsoWebComponent', () => {
  let component: UsoWebComponent;
  let fixture: ComponentFixture<UsoWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsoWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
