import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
//importamos para generar los formularios reactivos;
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RequerimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // para formularios reactivos;
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
