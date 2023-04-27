import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoteriaServices } from 'src/app/services/loteriaServices';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resultado-sorteo-semanal-input-fields',
  templateUrl: './resultado-sorteo-semanal-input-fields.component.html',
  styleUrls: ['./resultado-sorteo-semanal-input-fields.component.css']
})
export class ResultadoSorteoSemanalInputFieldsComponent {
  @Input() resultadoSemana: any;
  @Output() volverPrincipal: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  result: any[] = [];
  numeros: any[] = [];
  dia: number = 0;
  contador2cifras4: number = 0;
  contador3cifras4: number = 0;
  contador4cifras4: number = 0;
  contador2cifras3: number = 0;
  contador3cifras3: number = 0;
  listaPlenos4: string[] = [];
  listaOrdenados4: string[] = [];
  listaPlenos3: string[] = [];
  listaOrdenados3: string[] = [];
  aciertos3: number = 0;
  aciertosO3: number = 0;
  aciertos4: number = 0;
  aciertosO4: number = 0;
  apuesta: number = 0;
  // a continuación definimos las ganancias por cada peso apostado
  valorApuesta4CifrasP: number = 4500;
  valorApuesta4CifrasO: number = 208;
  valorApuesta3CifrasP: number = 400;
  valorApuesta3CifrasO: number = 83;
  //variables para determinar la ganancia neta
  inversion: number = 0;
  ganancia4: number = 0;
  gananciaO4: number = 0;
  ganancia3: number = 0;
  gananciaO3: number = 0;
  utilidad4: number = 0;
  utilidadO4: number = 0;
  utilidad3: number = 0;
  utilidadO3: number = 0;

  constructor(private _loteriaService: LoteriaServices, private fb: FormBuilder) {
    this.form = this.fb.group({
      apuesta: ['1000', Validators.required]
    })
  }

  /* dias en que juega cada loteria: del siguiente listado para organizar y ocultar la loteria selecciona y las loterias que juegan el mismo día;
  1.lunes:Cundinamarca, Tolima;
  2.martes:Cruz Roja, Hulia;
  3.miercoles:Meta,Valle, Manizales;
  4.jueves: Bogotá, Quindío;
  5.viernes: Risaralda, Medellín, Santander;
  6.sabado:Boyacá, Cauca;
   */


  ngOnInit(): void {
    if (this.resultadoSemana.loteria === 'Cundinamarca' || this.resultadoSemana.loteria === 'Tolima') { this.dia = 1 }
    if (this.resultadoSemana.loteria === 'Cruz Roja' || this.resultadoSemana.loteria === 'Huila') { this.dia = 2 }
    if (this.resultadoSemana.loteria === 'Meta' || this.resultadoSemana.loteria === 'Valle' || this.resultadoSemana.loteria === 'Manizales') { this.dia = 3 }
    if (this.resultadoSemana.loteria === 'Bogotá' || this.resultadoSemana.loteria === 'Quindío') { this.dia = 4 }
    if (this.resultadoSemana.loteria === 'Risaralda' || this.resultadoSemana.loteria === 'Medellín' || this.resultadoSemana.loteria === 'Santander') { this.dia = 5 }
    if (this.resultadoSemana.loteria === 'Boyacá' || this.resultadoSemana.loteria === 'Cauca') { this.dia = 6 }
    this.solicitarValoresMetodoColumna();
    this.contadorDeRepetidos();
  }

  solicitarValoresMetodoColumna() {
    this._loteriaService.getMetodoColumna(this.resultadoSemana.pleno).subscribe({
      next: (data) => {
        this.result = data
        this.aciertos(data);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  volverAListaCompleta() {
    console.log('Sin implementar aún')
  }

  //funcion para contar la cantidad de veces que se repiten las diferentes cifras exonerando los sorteos de ese mismo día
  contadorDeRepetidos() {
    // condicional para contar repetidos, dependiendo el dia seleccionado ese dia no se tomara en cuenta las loterias
    if (this.dia != 1) {
      // contador para 2 cifras respetidas de plenos de 4 cifras
      if (this.resultadoSemana.resultadoSemana.cundinamarca.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.tolima.dosCifras) this.contador2cifras4++;
      // contador para 3 cifras respetidas de plenos de 4 cifras
      if (this.resultadoSemana.resultadoSemana.cundinamarca.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.tolima.tresCifras) this.contador3cifras4++;
      // contador para 4 cifras resptidas de plenos de 4 cifras
      if (this.resultadoSemana.resultadoSemana.cundinamarca.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.tolima.cuatroCifras) this.contador4cifras4++;
      // contador para 2 cifras resptidas de plenos de 3 cifras
      if (this.resultadoSemana.resultadoSemana.cundinamarca.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.tolima.dosCifras3) this.contador2cifras3++;
      // contador para 3 cifras resptidas de plenos de 3 cifras
      if (this.resultadoSemana.resultadoSemana.cundinamarca.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.tolima.tresCifras3) this.contador3cifras3++;
      //agregamos los resultados de 3 y 4 cifras en plenos y ordenados para comparar con los resultados del metodo de la columna
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.cundinamarca.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.cundinamarca.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.cundinamarca.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.cundinamarca.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.tolima.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.tolima.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.tolima.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.tolima.ordenado);
    }
    if (this.dia != 2) {
      if (this.resultadoSemana.resultadoSemana.cruzRoja.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.huila.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.cruzRoja.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.huila.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.cruzRoja.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.huila.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.cruzRoja.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.huila.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.cruzRoja.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.huila.tresCifras3) this.contador3cifras3++;
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.cruzRoja.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.cruzRoja.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.cruzRoja.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.cruzRoja.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.huila.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.huila.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.huila.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.huila.ordenado.trim());
    }
    if (this.dia != 3) {
      if (this.resultadoSemana.resultadoSemana.manizales.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.meta.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.valle.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.manizales.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.meta.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.valle.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.manizales.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.meta.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.valle.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.manizales.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.meta.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.valle.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.manizales.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.meta.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.valle.tresCifras3) this.contador3cifras3++;
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.manizales.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.manizales.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.manizales.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.manizales.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.meta.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.meta.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.meta.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.meta.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.valle.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.valle.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.valle.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.valle.ordenado.trim());
    }
    if (this.dia != 4) {
      if (this.resultadoSemana.resultadoSemana.bogota.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.quindio.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.bogota.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.quindio.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.bogota.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.quindio.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.bogota.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.quindio.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.bogota.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.quindio.tresCifras3) this.contador3cifras3++;
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.bogota.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.bogota.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.bogota.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.bogota.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.quindio.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.quindio.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.quindio.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.quindio.ordenado.trim());
    }
    if (this.dia != 5) {
      if (this.resultadoSemana.resultadoSemana.medellin.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.risaralda.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.santander.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.medellin.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.risaralda.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.santander.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.medellin.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.risaralda.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.santander.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.medellin.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.risaralda.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.santander.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.medellin.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.risaralda.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.santander.tresCifras3) this.contador3cifras3++;
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.medellin.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.medellin.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.medellin.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.medellin.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.risaralda.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.risaralda.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.risaralda.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.risaralda.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.santander.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.santander.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.santander.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.santander.ordenado.trim());
    }
    if (this.dia != 6) {
      if (this.resultadoSemana.resultadoSemana.boyaca.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.cauca.dosCifras) this.contador2cifras4++;
      if (this.resultadoSemana.resultadoSemana.boyaca.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.cauca.tresCifras) this.contador3cifras4++;
      if (this.resultadoSemana.resultadoSemana.boyaca.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.cauca.cuatroCifras) this.contador4cifras4++;
      if (this.resultadoSemana.resultadoSemana.boyaca.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.cauca.dosCifras3) this.contador2cifras3++;
      if (this.resultadoSemana.resultadoSemana.boyaca.tresCifras3) this.contador3cifras3++;
      if (this.resultadoSemana.resultadoSemana.cauca.tresCifras3) this.contador3cifras3++;
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.boyaca.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.boyaca.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.boyaca.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.boyaca.ordenado.trim());
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.cauca.pleno3Cifras.trim());
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.cauca.ordenado3Cifras.trim());
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.cauca.pleno.trim());
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.cauca.ordenado.trim());
    }
  }

  //funcion para cuantificar cuantos exitos de acierto se tuvieron
  aciertos(data: any[]) {
    //console.log(this.listaPlenos3, this.listaOrdenados3, this.listaPlenos4, this.listaOrdenados4)

    // ciclos para comparar cada uno de los elementos de la lista del metodo de la columna con la lista de resultados de las loterias
    for (let item of data) {
      for (let item2 of this.listaPlenos3) {
        if (item.generado3Cifras.trim() === item2) {
          this.aciertos3++;
        }
      }
    }

    for (let item of data) {
      for (let item2 of this.listaOrdenados3) {
        if (item.ordenadoGenerado3Cifras.trim() === item2) {
          this.aciertosO3++;
        }
      }
    }

    for (let item of data) {
      for (let item2 of this.listaPlenos4) {
        if (item.generado4Cifras.trim() === item2) {
          this.aciertos4++;
        }
      }
    }

    for (let item of data) {
      for (let item2 of this.listaOrdenados4) {
        if (item.ordenadoGenerado4Cifras.trim() === item2) {
          this.aciertosO4++;
        }
      }
    }

    if (this.aciertos3 != 0 || this.aciertosO3 != 0 || this.aciertos4 != 0 || this.aciertosO4 != 0) {
      alert('Felicidades!!! obtuviste ' + (this.aciertos3 + this.aciertosO3 + this.aciertos4 + this.aciertosO4) + ' acierto(s)')
    }

  }

  calcular() {
    this.apuesta = +(this.form.value.apuesta);
    this.inversion = this.result.length * this.apuesta * this.listaOrdenados4.length;
    this.ganancia4 = this.aciertos4 * this.valorApuesta4CifrasP * this.apuesta;
    this.gananciaO4 = this.aciertosO4 * this.valorApuesta4CifrasO * this.apuesta;
    this.ganancia3 = this.aciertos3 * this.valorApuesta3CifrasP * this.apuesta;
    this.gananciaO3 = this.aciertosO3 * this.valorApuesta3CifrasO * this.apuesta;
    this.utilidad4 = this.ganancia4 - this.inversion;
    this.utilidadO4 = this.gananciaO4 - this.inversion;
    this.utilidad3 = this.ganancia3 - this.inversion;
    this.utilidadO3 = this.gananciaO3 - this.inversion;
  }

  volver() {
    this.volverPrincipal.emit();
  }

}
