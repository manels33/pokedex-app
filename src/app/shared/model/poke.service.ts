import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Poke } from './poke.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  public baseUrl = environment.url;

  constructor( private http: HttpClient) {
  }

  // get all pokemons
  getPokemonsAllTypes(limit: number, offset = 0): Observable<Poke>{
    return this.http.get<Poke>(`${this.baseUrl}/pokemon/?limit=${limit}&offset=${offset}`);
  }

  // get pokemon by id
  getPokemon(id?: number): Observable<Poke>{
    return this.http.get<Poke>(`${this.baseUrl}/pokemon/${id}`);
  }

}
