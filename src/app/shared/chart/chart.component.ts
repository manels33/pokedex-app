import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() stats: any;
  @Input() pokemonName: any;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartColors: Color[] = [
    {
      borderColor: '#c2c2c2',
      backgroundColor: '#3c5199',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line' as const;
  lineChartPlugins = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stats.currentValue && changes.stats.currentValue) {
      this.createChart();
    }
  }

  private createChart(): void {
    this.stats.forEach((data: any) => {
      this.lineChartData.push({data: data.base_stat, label: this.pokemonName});
      this.lineChartLabels.push(data.effort);
    });
  }
}
