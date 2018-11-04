import { Component, OnInit } from '@angular/core';

// chart.component.ts
import { Chart } from 'angular-highcharts';
 
@Component({
  selector: "<chart-pie>",
  template: `
    <div></div>
  `
   /*template: `
    <div [chart]="chart"></div>
  `*/
})
export class ChartPieComponent {
  chart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Proyectos más realizados'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });
}
