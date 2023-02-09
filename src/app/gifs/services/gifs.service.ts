import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '02n1wuHOZRCLS3jKlx4tZ01bQcgqJQyy';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query:string ) {

    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes( query ) ){
       this._historial.unshift( query );
       this._historial = this._historial.slice(0,10);
    }

    console.log( this._historial );
  }
}
