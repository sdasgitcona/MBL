import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseReceivedBarComponent } from './item-wise-received-bar.component';

describe('ItemWiseReceivedBarComponent', () => {
  let component: ItemWiseReceivedBarComponent;
  let fixture: ComponentFixture<ItemWiseReceivedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWiseReceivedBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemWiseReceivedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
