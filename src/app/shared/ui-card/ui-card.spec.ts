import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCard } from './ui-card';

describe('UiCard', () => {
  let component: UiCard;
  let fixture: ComponentFixture<UiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
