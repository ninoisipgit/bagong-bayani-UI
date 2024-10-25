import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private reportService: ReportsService) {}
  months = [
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
  ];

  applicantsData: any = {};
  companiesData: any = {};
  ofwData: any = [];
  topPaidData: any = [];
  topHired: any = [];
  ngOnInit() {
    this.reportService.getNumberofApplicants().subscribe((response) => {
      this.applicantsData = {
        currentYear: this.months.map((month) => response.currentYear[month]),
        previousYear: this.months.map((month) => response.previousYear[month]),
      };
    });
    this.reportService.getNumberofCompanies().subscribe((response) => {
      this.companiesData = {
        currentYear: this.months.map((month) => response.currentYear[month]),
        previousYear: this.months.map((month) => response.previousYear[month]),
      };
    });
    this.reportService.getNumberofOFW().subscribe((response) => {
      this.ofwData = {
        currentYear: this.months.map((month) => response.currentYear[month]),
        previousYear: this.months.map((month) => response.previousYear[month]),
      };
    });
    this.reportService.getTopPaidJobs().subscribe((response) => {
      this.topPaidData = {
        currentYear: response.currentYear.map(
          (e: any) => e.highest_base_salary
        ),
        CurrindustriesLabel: response.currentYear.map((e: any) => e.name),

        previousYear: response.previousYear.map(
          (e: any) => e.highest_base_salary
        ),
        PrevindustriesLabel: response.previousYear.map((e: any) => e.name),
      };
    });
    this.reportService.getCompanyHighHired().subscribe((response) => {
      this.topHired = {
        currentYear: response.currentYear.map((e: any) => e.total),
        CurrindustriesLabel: response.currentYear.map(
          (e: any) => e.hiring_organization_name
        ),

        previousYear: response.previousYear.map((e: any) => e.total),
        PrevindustriesLabel: response.previousYear.map(
          (e: any) => e.hiring_organization_name
        ),
      };
    });
  }

  // public lineChartData: ChartConfiguration<'line'>['data'] = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       label: 'Series A',
  //       fill: true,
  //       tension: 0.5,
  //       borderColor: 'black',
  //       backgroundColor: 'rgba(255,0,0,0.3)',
  //     },
  //   ],
  // };
  // public lineChartOptions: ChartOptions<'line'> = {
  //   responsive: true,
  // };
  // public lineChartLegend = true;

  // // end of line chart

  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   ],
  // };

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: true,
  // };
}
