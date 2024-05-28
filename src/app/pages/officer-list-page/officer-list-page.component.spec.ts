import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerListPageComponent } from './officer-list-page.component';

describe('CompanyOfficersPageComponent', () => {
  let component: OfficerListPageComponent;
  let fixture: ComponentFixture<OfficerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
