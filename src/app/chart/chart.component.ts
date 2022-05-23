import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const chart = new Chart("chart", {
      type: 'doughnut',
      data: {
        labels: [
          'Completed',
          'Uncompleted',
          'Total'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [50, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 141)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

}
