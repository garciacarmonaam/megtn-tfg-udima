import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alerta } from './Alerta';

export interface AlertaDesaparecido {
  id: number;
  nombre_apellidos: string;
}

@Component({
  selector: 'app-visor-registrodesaparecidos',
  templateUrl: './visor-registrodesaparecidos.component.html',
  styleUrls: ['./visor-registrodesaparecidos.component.css']
})
export class VisorRegistrodesaparecidosComponent implements OnInit {

  productoObservable: Observable<Object>;
  registro: AlertaDesaparecido[] = []; // Array cuyos elementos serán fuente de opciones de un selector 
  mes : string;

  codigoDescripcion: string;
  alertaDesaparicion : Alerta; // Variable de tipo de datos abstracto que almacena detalles sobre una alerta

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    /*
     * Esta petición añade a "registro" elementos con el nombre y apellidos de las personas cuya desaparición motiva la alerta
     */
    this.httpClient.get('/obtenerRegistro').subscribe((data) => {
      for (var i in data) {
        this.registro.push(
          {
            id: data[i]["cod_desap"],
            nombre_apellidos: data[i]["apellido1"] + " " + data[i]["apellido2"] + ", " + data[i]["nombre"]
          }
        );
      }
    });
  }

  /*
   * Esta función, en base a una petición GET, obtiene los detalles de la alerta sobre la persona
   * que nos interesa.
   */ 
  mostrarDetallesAlerta(codDesap) {
    this.httpClient.get('/buscarAlerta/' + codDesap).subscribe((data) => {
      if (data != undefined || data != "") {
        this.alertaDesaparicion = {
          cod_desap: data[0]["cod_desap"],
          nombre: data[0]["nombre"],
          apellidos: data[0]["apellido1"] + " " + data[0]["apellido2"],
          edad: data[0]["edad"],
          nombre_foto: data[0]["foto_perfil"],
          lugar_desaparicion: data[0]["lugar_desaparicion"],
          fecha_desaparicion: new Date(parseInt(data[0]["fecha_desaparicion"])),
          descripcion: data[0]["descripcion"],
          pistas: data[0]["pistas"]
        };
      }
    });
  }
}
