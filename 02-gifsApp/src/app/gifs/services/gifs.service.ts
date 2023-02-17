import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '02n1wuHOZRCLS3jKlx4tZ01bQcgqJQyy';
  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

    // if( localStorage.getItem('historial') ){
    //    this._historial = JSON.parse( localStorage.getItem('historial')!);
    // }

  };

  buscarGifs( query:string ) {


    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.slice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
       
    }

    this.http.get<SearchGifsResponse>( `https://api.giphy.com/v1/gifs/search?api_key=02n1wuHOZRCLS3jKlx4tZ01bQcgqJQyy&q=${ query } z&limit=10` )
      .subscribe( ( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
        localStorage.setItem( 'resultados', JSON.stringify( this.resultados) );
      });
  }
}
