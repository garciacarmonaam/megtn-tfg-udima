import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // El contenido de estas variables compondrá mensajes de bienvenida que se mostrarán en la página principal
  title = 'Bienvenido a MEGTN';
  timeZone = new Date();

  /*
      productoObservable: Observable<Object>;
      registro;

      obtenerRegistro() {
        this.productoObservable = this.httpClient.get('http://localhost:2019/obtenerRegistro');
        this.productoObservable.subscribe((data) => {
          this.registro = JSON.stringify(data[0]["nombre"]);
        });
      }
  */
}
