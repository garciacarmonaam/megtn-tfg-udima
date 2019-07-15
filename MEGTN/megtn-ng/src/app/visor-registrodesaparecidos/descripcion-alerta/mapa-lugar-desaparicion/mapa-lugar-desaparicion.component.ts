import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mapa-lugar-desaparicion',
  templateUrl: './mapa-lugar-desaparicion.component.html',
  styleUrls: ['./mapa-lugar-desaparicion.component.css']
})
export class MapaLugarDesaparicionComponent implements OnInit {

  // El contenido de estas variables será exactamente el que se remita al componete de terceros que muestra un mapa de Google
  @Input() latitud;
  @Input() longitud;

  script_geo;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

}
