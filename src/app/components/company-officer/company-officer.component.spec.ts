import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficerComponent } from './company-officer.component';

describe('CompanyOfficerComponent', () => {
  let component: CompanyOfficerComponent;
  let fixture: ComponentFixture<CompanyOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyOfficerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
