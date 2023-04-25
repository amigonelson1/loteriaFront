import { Component, Input } from '@angular/core';
import { LoteriaServices } from 'src/app/services/loteriaServices';

@Component({
  selector: 'app-resultado-sorteo-semanal-input-fields',
  templateUrl: './resultado-sorteo-semanal-input-fields.component.html',
  styleUrls: ['./resultado-sorteo-semanal-input-fields.component.css']
})
export class ResultadoSorteoSemanalInputFieldsComponent {
  @Input() resultadoSemana: any;
  result: any[] = [];
  numeros: any[] = [];
  dia: number = 0;

  constructor(private _loteriaService: LoteriaServices) { }

  /* dias en que juega cada loteria: del siguiente listado para organizar y ocultar la loteria selecciona y las loterias que juegan el mismo día;
  lunes:Cundinamarca, Tolima;
  martes:Cruz Roja, Hulia;
  miercoles:Meta,Valle, Manizales;
  jueves: Bogotá, Quindío;
  viernes: Risaralda, Medellín, Santander;
  sabado:Boyacá, Cauca;
   */


  ngOnInit(): void {
    if (this.resultadoSemana.loteria === 'Cundinamarca' || this.resultadoSemana.loteria === 'Tolima') { this.dia = 1 }
    if (this.resultadoSemana.loteria === 'Cruz Roja' || this.resultadoSemana.loteria === 'Huila') { this.dia = 2 }
    if (this.resultadoSemana.loteria === 'Meta' || this.resultadoSemana.loteria === 'Valle' || this.resultadoSemana.loteria === 'Manizales') { this.dia = 3 }
    if (this.resultadoSemana.loteria === 'Bogotá' || this.resultadoSemana.loteria === 'Quindío') { this.dia = 4 }
    if (this.resultadoSemana.loteria === 'Risaralda' || this.resultadoSemana.loteria === 'Medellín' || this.resultadoSemana.loteria === 'Santander') { this.dia = 5 }
    if (this.resultadoSemana.loteria === 'Boyacá' || this.resultadoSemana.loteria === 'Cauca') { this.dia = 6 }
    /*  this.numeros = [
       this.resultadoSemana.resultadoSemana.bogota.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.bogota.pleno,
       this.resultadoSemana.resultadoSemana.boyaca.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.boyaca.pleno,
       this.resultadoSemana.resultadoSemana.cauca.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.cauca.pleno,
       this.resultadoSemana.resultadoSemana.cruzRoja.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.cruzRoja.pleno,
       this.resultadoSemana.resultadoSemana.cundinamarca.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.cundinamarca.pleno,
       this.resultadoSemana.resultadoSemana.huila.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.huila.pleno,
       this.resultadoSemana.resultadoSemana.manizales.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.manizales.pleno,
       this.resultadoSemana.resultadoSemana.medellin.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.medellin.pleno,
       this.resultadoSemana.resultadoSemana.meta.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.meta.pleno,
       this.resultadoSemana.resultadoSemana.quindio.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.quindio.pleno,
       this.resultadoSemana.resultadoSemana.risaralda.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.risaralda.pleno,
       this.resultadoSemana.resultadoSemana.santander.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.santander.pleno,
       this.resultadoSemana.resultadoSemana.tolima.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.tolima.pleno,
       this.resultadoSemana.resultadoSemana.valle.nombreLoteria + ": " + this.resultadoSemana.resultadoSemana.valle.pleno,
     ]; */
    this.solicitarValoresMetodoColumna();
  }

  solicitarValoresMetodoColumna() {
    this._loteriaService.getMetodoColumna(this.resultadoSemana.pleno).subscribe({
      next: (data) => this.result = data,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  volverAListaCompleta() {
  }
}
