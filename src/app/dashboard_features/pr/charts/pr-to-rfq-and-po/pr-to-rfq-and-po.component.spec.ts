import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrToRfqAndPoComponent } from './pr-to-rfq-and-po.component';

describe('PrToRfqAndPoComponent', () => {
  let component: PrToRfqAndPoComponent;
  let fixture: ComponentFixture<PrToRfqAndPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrToRfqAndPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrToRfqAndPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
