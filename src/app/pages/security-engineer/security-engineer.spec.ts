import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityEngineer } from './security-engineer';

describe('SecurityEngineer', () => {
  let component: SecurityEngineer;
  let fixture: ComponentFixture<SecurityEngineer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityEngineer],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityEngineer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
