import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueTeamAnalyst } from './blue-team-analyst';

describe('BlueTeamAnalyst', () => {
  let component: BlueTeamAnalyst;
  let fixture: ComponentFixture<BlueTeamAnalyst>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlueTeamAnalyst],
    }).compileComponents();

    fixture = TestBed.createComponent(BlueTeamAnalyst);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
