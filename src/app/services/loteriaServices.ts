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
  private myApiUrlColumna = 'api/Loteria/GetMetodoColumna/';

  constructor(private http: HttpClient) { }

  getListSorteos(sorteo: number, nombre: string, fecha: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrlSorteos + `${sorteo}/${nombre}/${fecha}`,);
  }

  validationsDate(initial: Date, endend: Date): boolean {
    if (initial < endend) return false;
    else return true;
  }

  getListSemanal(inicial: string, final: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrlSemanal + `${inicial}/${final}`,);
  }

  getMetodoColumna(pleno: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrlColumna + `${pleno}`,);
  }

}
