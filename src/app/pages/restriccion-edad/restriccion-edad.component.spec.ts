import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestriccionEdadComponent } from './restriccion-edad.component';

describe('RestriccionEdadComponent', () => {
  let component: RestriccionEdadComponent;
  let fixture: ComponentFixture<RestriccionEdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestriccionEdadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestriccionEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
