import { Component, OnInit } from '@angular/core';

// chart.component.ts
import { Chart } from 'angular-highcharts';

@Component({
  selector: '<chart-arrow>',
  template: `
    <div></div>
  `
  /*template: `
    <div [chart]="chart"></div>
  `*/
})
export class ChartArrowComponent {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Crecimiento de ingresos'
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

