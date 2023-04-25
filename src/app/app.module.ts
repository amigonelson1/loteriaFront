import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';

//importamos para generar los formularios reactivos;
import { ReactiveFormsModule } from '@angular/forms';

//Modulo para peticiones http;
import { HttpClientModule } from '@angular/common/http';
import { ResultadoSorteoSemanalComponent } from './components/resultado-sorteo-semanal/resultado-sorteo-semanal.component';
import { ResultadoSorteoSemanalListComponent } from './components/resultado-sorteo-semanal/resultado-sorteo-semanal-list/resultado-sorteo-semanal-list.component';
import { ResultadoSorteoSemanalInputFieldsComponent } from './components/resultado-sorteo-semanal/resultado-sorteo-semanal-input-fields/resultado-sorteo-semanal-input-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    RequerimientosComponent,
    ResultadoSorteoSemanalComponent,
    ResultadoSorteoSemanalListComponent,
    ResultadoSorteoSemanalInputFieldsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // para formularios reactivos;
    HttpClientModule, //modulo para peticiones http;
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
