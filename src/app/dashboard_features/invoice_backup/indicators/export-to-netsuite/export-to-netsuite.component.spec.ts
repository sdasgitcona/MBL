import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportToNetsuiteComponent } from './export-to-netsuite.component';

describe('ExportToNetsuiteComponent', () => {
  let component: ExportToNetsuiteComponent;
  let fixture: ComponentFixture<ExportToNetsuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportToNetsuiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportToNetsuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
