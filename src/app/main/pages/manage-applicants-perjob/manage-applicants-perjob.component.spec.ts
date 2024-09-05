import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApplicantsPerjobComponent } from './manage-applicants-perjob.component';

describe('ManageApplicantsPerjobComponent', () => {
  let component: ManageApplicantsPerjobComponent;
  let fixture: ComponentFixture<ManageApplicantsPerjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageApplicantsPerjobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageApplicantsPerjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
