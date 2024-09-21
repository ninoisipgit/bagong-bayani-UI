import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJobDetailsComponent } from './modal-job-details.component';

describe('ModalJobDetailsComponent', () => {
  let component: ModalJobDetailsComponent;
  let fixture: ComponentFixture<ModalJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalJobDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
