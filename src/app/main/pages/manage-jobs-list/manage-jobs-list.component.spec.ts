import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobsListComponent } from './manage-jobs-list.component';

describe('ManageJobsListComponent', () => {
  let component: ManageJobsListComponent;
  let fixture: ComponentFixture<ManageJobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
