import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})

export class RequerimientosComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sorteos: ['', [Validators.required,]],
      loteria: ['', Validators.required],
    })
  }

  solicitar() {
    console.log('haz hecho una solicitud', this.form.value)
    //Al retornar reseteamos los campos;
    this.form.reset();
  }


}
