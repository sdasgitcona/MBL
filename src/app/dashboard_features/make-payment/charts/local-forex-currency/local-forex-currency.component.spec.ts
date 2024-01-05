import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalForexCurrencyComponent } from './local-forex-currency.component';

describe('LocalForexCurrencyComponent', () => {
  let component: LocalForexCurrencyComponent;
  let fixture: ComponentFixture<LocalForexCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalForexCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalForexCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
