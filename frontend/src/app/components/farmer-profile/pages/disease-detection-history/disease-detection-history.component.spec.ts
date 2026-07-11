import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetectionHistoryComponent } from './disease-detection-history.component';

describe('DiseaseDetectionHistoryComponent', () => {
  let component: DiseaseDetectionHistoryComponent;
  let fixture: ComponentFixture<DiseaseDetectionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseDetectionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseDetectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
