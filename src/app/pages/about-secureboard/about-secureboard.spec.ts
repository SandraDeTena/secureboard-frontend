import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSecureboard } from './about-secureboard';

describe('AboutSecureboard', () => {
  let component: AboutSecureboard;
  let fixture: ComponentFixture<AboutSecureboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSecureboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSecureboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
