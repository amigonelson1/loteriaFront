import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoteriaServices {

  private myAppUrl = 'https://localhost:7135/';
  private myApiUrl = 'api/Loteria/GetSorteos/';

  constructor(private http: HttpClient) { }

  getListTarjetas(sorteo:number, nombre:string, fech:string): Observable<any> {
    const numeroSorteos = sorteo;
    const nombreLoteria = nombre;
    const fecha = fech;
    return this.http.get(this.myAppUrl + this.myApiUrl + `${numeroSorteos}/${nombreLoteria}/${fecha}`,);
  }

}
