import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LoteriaServices } from 'src/app/services/loteriaServices';

@Component({
  selector: 'app-resultado-sorteo-semanal',
  templateUrl: './resultado-sorteo-semanal.component.html',
  styleUrls: ['./resultado-sorteo-semanal.component.css']
})
export class ResultadoSorteoSemanalComponent {
  form!: FormGroup;
  data!: [];
  resultadoSemana: any;
  verListaResultado: boolean=true;
  resultPadre: any[] = [];


  constructor(private fb: FormBuilder,
    private _loteriaService: LoteriaServices) {
    this.form = this.fb.group({
      fechaInicial: ['2022-10-01', Validators.required],
      fechaFinal: ['2023-10-01', Validators.required],
    });
  }

  getMetodoColumna(resultadoSemana:any)
  {
    this.resultadoSemana= resultadoSemana;
    this.verListaResultado=false;
  }

  solicitar() {
    if (this._loteriaService.validationsDate(this.form.value.fechaInicial, this.form.value.fechaFinal)) {
      alert('Lo sentimos, el rango de fechas no está correctamente definido, por favor verifique');
      //this.form.reset();
      return;
    }
    this._loteriaService.getListSemanal(this.form.value.fechaInicial, this.form.value.fechaFinal).subscribe({
      next: (data) => this.resultPadre = data,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
    //this.form.reset();
    this.verListaResultado=true;

  }
  volverPrincipal(){
    this.verListaResultado=true;
  }

}
