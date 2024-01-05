import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCompanyExpirationInactivatedCompanyComponent } from './upcoming-company-expiration-inactivated-company.component';

describe('UpcomingCompanyExpirationInactivatedCompanyComponent', () => {
  let component: UpcomingCompanyExpirationInactivatedCompanyComponent;
  let fixture: ComponentFixture<UpcomingCompanyExpirationInactivatedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingCompanyExpirationInactivatedCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingCompanyExpirationInactivatedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
