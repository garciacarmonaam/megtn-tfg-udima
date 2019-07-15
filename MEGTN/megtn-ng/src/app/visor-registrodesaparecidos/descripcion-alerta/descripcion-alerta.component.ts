import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Alerta } from '../Alerta';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-descripcion-alerta',
  templateUrl: './descripcion-alerta.component.html',
  styleUrls: ['./descripcion-alerta.component.css']
})
export class DescripcionAlertaComponent implements OnInit, OnChanges {
  @Input() alerta: Alerta; // Esta variable toma los detalles enviados sobre la alerta que nos interesa mostrar.
  atributosPistas: string[] = ['fecha', 'detalle'];
  registroPistas;
  latitud_lug_desap;
  longitud_lug_desap;
  rutaImagen : string;
  ruta : string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.ruta = window.location.protocol + '//' + window.location.hostname + '/descargarImagenBD/';
    this.registroPistas = this.alerta.pistas;

    /*
     * Completado de las variables cuyos datos se remitirán, como datos de entrada, al componente encargado del mapa
     */ 
    this.latitud_lug_desap = this.alerta.lugar_desaparicion[0];
    this.longitud_lug_desap = this.alerta.lugar_desaparicion[1];

    // this.http.get('/descargarImagenBD/' + this.alerta.nombre_foto.toString(), {responseType: 'text'}).subscribe((data) => { 
    /*
     * Por las restricciones de escritura en el sistema de archivos de Google App Engine, determinamos un archivo
     * de imagen común a mostrar siempre, en el "campo" de la foto de perfil que vemos en la descripción de alerta.
     */
    this.rutaImagen = 'http://amgarciac.es/privado/avatar_comodinMEGTN.png'; 
    // });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
