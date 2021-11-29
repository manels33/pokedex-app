import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poke } from 'src/app/shared/model/poke.model';
import { PokeService } from 'src/app/shared/model/poke.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  public pokemonId: number;
  public pokemonDetails: any;
  public pokemonData: Poke = {};

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getPokemonId();
    await this.getPokemonDetails();
  }

  // get pokemon of current route
  getPokemonId(): Subscription {
    return this.route.params.subscribe(params => {
      this.pokemonId = params.id;
    });
  }

  // getPokemonDetails
  async getPokemonDetails(): Promise<void>{
      this.pokeService.getPokemon(this.pokemonId).subscribe((pokemon: any) => {
        this.pokemonData = {
          id : pokemon.id,
          name : pokemon.name,
          types : pokemon.types,
          image : pokemon.sprites.front_default,
          stats: pokemon.stats,
          weight: pokemon.weight,
          height: pokemon.height,
        };
      }, err => console.log(err));
  }

}
