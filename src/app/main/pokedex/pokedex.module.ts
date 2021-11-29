import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex.component';
import { DetailsComponent } from './details/details.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ChartComponent } from './../../shared/chart/chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PokedexComponent,
    DetailsComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ChartsModule
  ]
})
export class PokedexModule { }
