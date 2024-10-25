import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges {
  @Input() title!: string;
  @Input() data!: { currentYear: number[]; previousYear: number[] };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
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
      {
        data: [],
        label: 'Current Year',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
      {
        data: [],
        label: 'Last Year',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(52, 0, 172, 0.8)',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      // Update the data for the datasets
      this.lineChartData = {
        ...this.lineChartData, // Spread to maintain labels
        datasets: [
          { ...this.lineChartData.datasets[0], data: this.data.currentYear },
          { ...this.lineChartData.datasets[1], data: this.data.previousYear },
        ],
      };
    }
  }
}
