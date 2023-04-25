import { Component, Input } from '@angular/core';
import { LoteriaServices } from 'src/app/services/loteriaServices';

@Component({
  selector: 'app-resultado-sorteo-semanal-input-fields',
  templateUrl: './resultado-sorteo-semanal-input-fields.component.html',
  styleUrls: ['./resultado-sorteo-semanal-input-fields.component.css']
})
export class ResultadoSorteoSemanalInputFieldsComponent {
  @Input() resultadoSemana: any;
  result: string[] = [];
  numeros: string[] = [];

  constructor(private _loteriaService: LoteriaServices) { }

  ngOnInit(): void {
    this.numeros = [
      //this.resultadoSemana.resultadoSemana.bogota.pleno,
      this.resultadoSemana.resultadoSemana.boyaca.pleno,
      this.resultadoSemana.resultadoSemana.cauca.pleno,
      this.resultadoSemana.resultadoSemana.cruzRoja.pleno,
      this.resultadoSemana.resultadoSemana.cundinamarca.pleno,
      this.resultadoSemana.resultadoSemana.huila.pleno,
      this.resultadoSemana.resultadoSemana.manizales.pleno,
      this.resultadoSemana.resultadoSemana.medellin.pleno,
      this.resultadoSemana.resultadoSemana.meta.pleno,
      this.resultadoSemana.resultadoSemana.quindio.pleno,
      this.resultadoSemana.resultadoSemana.risaralda.pleno,
      this.resultadoSemana.resultadoSemana.santander.pleno,
      this.resultadoSemana.resultadoSemana.tolima.pleno,
      this.resultadoSemana.resultadoSemana.valle.pleno,
    ];
    this.solicitarValoresMetodoColumna();
  }

  solicitarValoresMetodoColumna() {
    this._loteriaService.getMetodoColumna(this.resultadoSemana.pleno).subscribe({
      next: (data) => this.result = data,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
}
