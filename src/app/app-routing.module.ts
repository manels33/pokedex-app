import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'poke',component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./main/pokedex/pokedex.module').then(m => m.PokedexModule) },
    ]
  },
  {
    path: '**',
    redirectTo: '/poke'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
