import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AgmCoreModule } from '@agm/core';

import { VisorRegistrodesaparecidosComponent } from './visor-registrodesaparecidos/visor-registrodesaparecidos.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { DescripcionAlertaComponent } from './visor-registrodesaparecidos/descripcion-alerta/descripcion-alerta.component';
import { MatListModule } from '@angular/material/list';
import { MapaLugarDesaparicionComponent } from './visor-registrodesaparecidos/descripcion-alerta/mapa-lugar-desaparicion/mapa-lugar-desaparicion.component';
import { FormularioEnvioAlertasComponent } from './formulario-envio-alertas/formulario-envio-alertas.component';
import { FormularioRemisionPistasComponent } from './formulario-remision-pistas/formulario-remision-pistas.component';


@NgModule({
  declarations: [
    AppComponent,
    VisorRegistrodesaparecidosComponent,
    DescripcionAlertaComponent,
    MapaLugarDesaparicionComponent,
    FormularioEnvioAlertasComponent,
    FormularioRemisionPistasComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkJMbLK_O5BzbIGYQqBH0ety3LTrSKsFQ'
    }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
