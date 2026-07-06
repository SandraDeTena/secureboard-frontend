import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cases } from './cases';

describe('Cases', () => {
  let component: Cases;
  let fixture: ComponentFixture<Cases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cases],
    }).compileComponents();

    fixture = TestBed.createComponent(Cases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
