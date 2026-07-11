import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriServicesComponent } from './agri-services.component';

describe('AgriServicesComponent', () => {
  let component: AgriServicesComponent;
  let fixture: ComponentFixture<AgriServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
