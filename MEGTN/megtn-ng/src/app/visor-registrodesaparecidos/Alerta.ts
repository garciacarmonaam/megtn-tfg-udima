export class Alerta {
  cod_desap: number;
  nombre : string;
  apellidos : string;
  edad: number;
  nombre_foto: string;
  lugar_desaparicion : Object; // Esta variable almacena un registro de coordenadas geográficas (arreglo)
  fecha_desaparicion: Date;
  descripcion: string;
  pistas: Object; // Esta variable almacena un registro de pistas (arreglo)
}
