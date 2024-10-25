import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  @Input() title!: string;
  @Input() data!: { currentYear: number[]; previousYear: number[] };

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      { data: [], label: 'Current Year' },
      { data: [], label: 'Last Year' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      // Update the data for the datasets
      this.barChartData = {
        ...this.barChartData, // Spread to maintain labels
        datasets: [
          { ...this.barChartData.datasets[0], data: this.data.currentYear },
          { ...this.barChartData.datasets[1], data: this.data.previousYear },
        ],
      };
    }
  }
}
