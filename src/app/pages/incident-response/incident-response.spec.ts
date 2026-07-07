import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentResponse } from './incident-response';

describe('IncidentResponse', () => {
  let component: IncidentResponse;
  let fixture: ComponentFixture<IncidentResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentResponse],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
