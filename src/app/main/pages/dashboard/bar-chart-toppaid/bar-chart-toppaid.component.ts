import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-chart-toppaid',
  templateUrl: './bar-chart-toppaid.component.html',
  styleUrls: ['./bar-chart-toppaid.component.scss'],
})
export class BarChartToppaidComponent {
  @Input() title!: string;
  @Input() data!: {
    currentYear: number[];
    previousYear: number[];
    CurrindustriesLabel: string[];
    PrevindustriesLabel: string[];
  };

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
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
        labels: this.data.CurrindustriesLabel,
        datasets: [
          { ...this.barChartData.datasets[0], data: this.data.currentYear },
          // { ...this.barChartData.datasets[1], data: this.data.previousYear },
        ],
      };
    }
  }

  onSelect(e: any) {
    console.log(e.value);

    if (e.value == 2) {
      this.barChartData = {
        ...this.barChartData, // Spread to maintain labels
        labels: this.data.PrevindustriesLabel,
        datasets: [
          {
            ...this.barChartData.datasets[1],
            data: this.data.currentYear,
            label: 'Previous Year',
          },
          // { ...this.barChartData.datasets[1], data: this.data.previousYear },
        ],
      };
    } else {
      this.barChartData = {
        ...this.barChartData, // Spread to maintain labels
        labels: this.data.CurrindustriesLabel,
        datasets: [
          {
            ...this.barChartData.datasets[0],
            data: this.data.currentYear,
            label: 'Current Year',
          },
          // { ...this.barChartData.datasets[1], data: this.data.previousYear },
        ],
      };
    }
  }
}
