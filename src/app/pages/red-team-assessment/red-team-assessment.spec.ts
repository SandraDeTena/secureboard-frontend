import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedTeamAssessment } from './red-team-assessment';

describe('RedTeamAssessment', () => {
  let component: RedTeamAssessment;
  let fixture: ComponentFixture<RedTeamAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedTeamAssessment],
    }).compileComponents();

    fixture = TestBed.createComponent(RedTeamAssessment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
