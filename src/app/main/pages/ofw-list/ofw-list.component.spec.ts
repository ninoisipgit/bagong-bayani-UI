import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfwListComponent } from './ofw-list.component';

describe('OfwListComponent', () => {
  let component: OfwListComponent;
  let fixture: ComponentFixture<OfwListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfwListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfwListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
