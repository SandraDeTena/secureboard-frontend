import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsintInvestigation } from './osint-investigation';

describe('OsintInvestigation', () => {
  let component: OsintInvestigation;
  let fixture: ComponentFixture<OsintInvestigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsintInvestigation],
    }).compileComponents();

    fixture = TestBed.createComponent(OsintInvestigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
