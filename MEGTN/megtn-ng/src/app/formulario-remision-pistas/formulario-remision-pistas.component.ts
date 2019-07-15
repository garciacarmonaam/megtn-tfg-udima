import { Component, OnInit } from '@angular/core';
import { AlertaDesaparecido } from '../visor-registrodesaparecidos/visor-registrodesaparecidos.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario-remision-pistas',
  templateUrl: './formulario-remision-pistas.component.html',
  styleUrls: ['./formulario-remision-pistas.component.css']
})
export class FormularioRemisionPistasComponent implements OnInit {

  registro: AlertaDesaparecido[] = [];
  alertaElegida;

  constructor(private httpClient: HttpClient) { }

  /*
   * Al cargar este componente, hay que cargar, en el selector de opciones, los códigos así como el nombre y apellidos
   * de las personas cuya desaparición es motivo de alerta (estos dos últimos se mostrarán al usuario)
   */ 
  ngOnInit() {
    this.httpClient.get('/obtenerRegistro').subscribe((data) => {
      for (var i in data) {
        this.registro.push(
          { id: data[i]["cod_desap"], nombre_apellidos: data[i]["apellido1"] + " " + data[i]["apellido2"] + ", " + data[i]["nombre"] }
        );
      }
    });
  }

  /*
   * Asignamos a una variable específica el código de desaparición de la alerta elegida.
   */
  asignarAlertaEscogida(codDesap) {
    this.alertaElegida = codDesap;
  }
}
