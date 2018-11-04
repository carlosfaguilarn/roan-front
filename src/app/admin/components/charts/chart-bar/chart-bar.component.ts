import { Component, OnInit } from '@angular/core';

// chart.component.ts
import { Chart } from 'angular-highcharts';

@Component({
  selector: '<chart-bar>', 
  template: `
    <div></div>
  `
   /*template: `
    <div [chart]="chart"></div>
  `*/
})
export class ChartBarComponent {
  chart = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Proyectos que generan más ingresos'
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

