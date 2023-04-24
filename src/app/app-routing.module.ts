import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { ResultadoSorteoSemanalComponent } from './components/resultado-sorteo-semanal/resultado-sorteo-semanal.component';

//A continuacion definimos las rutas;
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'porloteria', component: RequerimientosComponent },
  { path: 'porfecha', component: ResultadoSorteoSemanalComponent },
  //para redireccionar a rutas no disponibles debemos poner el path:'**' de ultimo, para evira conflicto con las demas rutas;
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
