import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resultado-sorteo-semanal-list',
  templateUrl: './resultado-sorteo-semanal-list.component.html',
  styleUrls: ['./resultado-sorteo-semanal-list.component.css']
})
export class ResultadoSorteoSemanalListComponent {
  @Input() result: any[] = [];
  @Output() metodoColumna: EventEmitter<any> = new EventEmitter<any>();


  generarMetodoColumna(pleno: string, loteria: string, resultadoSemana: any) {
    let variable = { pleno, loteria, resultadoSemana };
    this.metodoColumna.emit(variable);
  }

}
