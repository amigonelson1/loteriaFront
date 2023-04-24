import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoteriaServices } from 'src/app/services/loteriaServices';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})

export class RequerimientosComponent {

  form!: FormGroup;
  data!: [];
  result: any[] = [];

  constructor(private fb: FormBuilder,
    private _loteriaService: LoteriaServices) {
    this.form = this.fb.group({
      numeroSorteos: ['', Validators.required],
      nombreLoteria: ['', Validators.required],
      fecha: ['', Validators.required]
    })
  }

  solicitar() {
    console.log('haz hecho una solicitud', this.form.value)
    this._loteriaService.getListTarjetas(this.form.value.numeroSorteos, this.form.value.nombreLoteria, this.form.value.fecha).subscribe({
      next: (data) => { console.log(data); this.result = data },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
    this.form.reset();
  }


}
