import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisorRegistrodesaparecidosComponent } from './visor-registrodesaparecidos/visor-registrodesaparecidos.component';
import { FormularioEnvioAlertasComponent } from './formulario-envio-alertas/formulario-envio-alertas.component';
import { FormularioRemisionPistasComponent } from './formulario-remision-pistas/formulario-remision-pistas.component';

const routes: Routes = [
  { path: 'consultarRegistro', component: VisorRegistrodesaparecidosComponent },
  { path: 'crearNuevaAlerta', component: FormularioEnvioAlertasComponent },
  { path: 'aportarNuevasPistas', component: FormularioRemisionPistasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
