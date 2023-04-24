import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoteriaServices {

  private myAppUrl = 'https://localhost:7135/';
  private myApiUrlSorteos = 'api/Loteria/GetSorteos/';
  private myApiUrlSemanal = 'api/Loteria/GetSemanal/';

  constructor(private http: HttpClient) { }

  getListSorteos(sorteo: number, nombre: string, fech: string): Observable<any> {
    const numeroSorteos = sorteo;
    const nombreLoteria = nombre;
    const fecha = fech;
    return this.http.get(this.myAppUrl + this.myApiUrlSorteos + `${numeroSorteos}/${nombreLoteria}/${fecha}`,);
  }

  validationsDate(initial: Date, endend: Date): boolean {
    if (initial < endend) return false;
    else return true;
  }

  getListSemanal(inicial: string, final: string): Observable<any> {
    const fechaInicial = inicial;
    const fechaFinal = final;
    return this.http.get(this.myAppUrl + this.myApiUrlSemanal + `${fechaInicial}/${fechaFinal}`,);
  }

}
