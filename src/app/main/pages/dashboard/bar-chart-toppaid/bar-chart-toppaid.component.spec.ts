import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartToppaidComponent } from './bar-chart-toppaid.component';

describe('BarChartToppaidComponent', () => {
  let component: BarChartToppaidComponent;
  let fixture: ComponentFixture<BarChartToppaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartToppaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartToppaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
