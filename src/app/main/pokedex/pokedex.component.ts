import { Component, OnInit, ViewChild} from '@angular/core';
import { PokeService } from 'src/app/shared/model/poke.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Poke } from 'src/app/shared/model/poke.model';
import { ActivatedRoute, Router } from '@angular/router';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image', 'action'];
  pokemenLists: Poke[] = [];
  dataSource = new MatTableDataSource(this.pokemenLists);
  allPokemons: any;
  pokemonDatas: any;
  lengthPokemons: number;
  pageSize = 10;
  offset = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator; // For pagination

  constructor(
    private pokeService: PokeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPokemonsAllTypes();
  }

  // get all types of pokemon
  async getPokemonsAllTypes(): Promise<void>{
      this.pokeService.getPokemonsAllTypes(this.pageSize, this.offset).subscribe((result: any) => {
        this.lengthPokemons = result.count;
        this.allPokemons = result;
        this.getPokemons();
      }, err => console.log(err));
  }

  // get pokemon by id
  async getPokemons(): Promise<void> {
    const temp: Observable<Poke>[] = [];
    //Create array with empty objects equivalent to length of table to set length of table
    this.pokemenLists = new Array(this.lengthPokemons).fill({});
    // get pokemon with name
    for (const pokemon of this.allPokemons.results) {
      temp.push(this.pokeService.getPokemon(pokemon.name));
    }
    // execute array of observable and wait for their resultion
    forkJoin(...temp).subscribe((res) => {
      const pokemons = res.map((poke: any) => ({
          id : poke.id,
          name : poke.name,
          image : poke.sprites.front_default
      }));
      //sort table by id
      pokemons.sort((a: any, b: any) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      // get a part of list to manage pagination
      this.pokemenLists.splice(this.offset, this.pageSize, ...pokemons);
      this.setDataSource();
    });
  }

  // set dataSource and paginator
  setDataSource(): void {
    this.dataSource = new MatTableDataSource<any>(this.pokemenLists);
    this.dataSource.paginator = this.paginator;
  }

  // go to details
  async goToDetails(id: number): Promise<void>{
    await this.router.navigate([`./${id}`], {relativeTo: this.route});
  }

  // pagination event
  pageEvent(event: PageEvent) {
    this.offset = event.pageIndex * this.pageSize;
    this.getPokemonsAllTypes();
  }

}
