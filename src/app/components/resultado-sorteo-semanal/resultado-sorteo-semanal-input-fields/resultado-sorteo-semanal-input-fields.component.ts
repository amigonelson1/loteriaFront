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

  constructor(private _loteriaService: LoteriaServices) { }

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
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.cruzRoja.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.cruzRoja.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.cruzRoja.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.cruzRoja.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.huila.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.huila.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.huila.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.huila.ordenado);
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
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.manizales.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.manizales.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.manizales.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.manizales.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.meta.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.meta.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.meta.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.meta.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.valle.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.valle.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.valle.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.valle.ordenado);
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
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.bogota.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.bogota.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.bogota.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.bogota.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.quindio.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.quindio.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.quindio.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.quindio.ordenado);
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
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.medellin.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.medellin.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.medellin.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.medellin.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.risaralda.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.risaralda.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.risaralda.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.risaralda.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.santander.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.santander.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.santander.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.santander.ordenado);
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
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.boyaca.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.boyaca.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.boyaca.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.boyaca.ordenado);
      this.listaPlenos3.push(this.resultadoSemana.resultadoSemana.cauca.pleno3Cifras);
      this.listaOrdenados3.push(this.resultadoSemana.resultadoSemana.cauca.ordenado3Cifras);
      this.listaPlenos4.push(this.resultadoSemana.resultadoSemana.cauca.pleno);
      this.listaOrdenados4.push(this.resultadoSemana.resultadoSemana.cauca.ordenado);
    }
  }

  //funcion para cuantificar cuantos exitos de acierto se tuvieron
  aciertos(data: any[]) {
    //console.log(this.listaPlenos3, this.listaOrdenados3, this.listaPlenos4, this.listaOrdenados4)

    for (let item of data) {
      var indices = [];
      var idx = this.listaPlenos3.indexOf(item.generado3Cifras);
      while (idx != -1) {
        indices.push(idx);
        idx = this.listaPlenos3.indexOf(item.generado3Cifras, idx + 1);
      }
      this.aciertos3 = indices.length;
    }

    for (let item of data) {
      console.log(this.listaOrdenados3[0], item.ordenadoGenerado3Cifras)
      var indices = [];
      var idx = this.listaOrdenados3.indexOf(item.ordenadoGenerado3Cifras);
      while (idx != -1) {
        indices.push(idx);
        idx = this.listaOrdenados3.indexOf(item.ordenadoGenerado3Cifras, idx + 1);
      }
      console.log(indices)
      this.aciertosO3 = indices.length;
    }

    for (let item of data) {
      var indices = [];
      var idx = this.listaPlenos4.indexOf(item.generado4Cifras);
      while (idx != -1) {
        indices.push(idx);
        idx = this.listaPlenos4.indexOf(item.generado4Cifras, idx + 1);
      }
      this.aciertos4 = indices.length;
    }

    for (let item of data) {
      console.log();
      var indices = [];
      var idx = this.listaOrdenados4.indexOf(item.ordenadoGenerado4Cifras);
      while (idx != -1) {
        indices.push(idx);
        idx = this.listaOrdenados4.indexOf(item.ordenadoGenerado4Cifras, idx + 1);
      }
      this.aciertosO4 = indices.length;
    }

  }

}
