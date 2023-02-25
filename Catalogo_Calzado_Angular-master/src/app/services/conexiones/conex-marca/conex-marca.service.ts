import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';
import { Subject } from 'rxjs';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConexMarcaService {

/* Un emisor de eventos que se utiliza para emitir un evento al componente principal. */
  @Output() disparadorMarca: EventEmitter<any> = new EventEmitter();

 /* Una variable que se utiliza para almacenar la URL de la API. */
  private url=API_URL+'marca/';

/* Un Sujeto que se usa para emitir un evento al componente principal. */
  private _refresh$ = new Subject<void>();
  
  constructor(private http:HttpClient) { }

 /* Una función que devuelve los datos de la API. */
  getMarcas(){
    return this.http.get(this.url);
  };

 /* Una función que devuelve los datos de la API. */
  getUnMarca(id_Marca:number){
    return this.http.get(this.url+id_Marca)
  };
  
 /* Una función que agrega una nueva marca a la base de datos. */
  addMarca(marca:Marca){
    return this.http.post(this.url,marca)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  /* Eliminación de una marca de la base de datos. */
  deleteMarca(id:number){
    return this.http.delete(this.url+id);
  };

   /* Una función que actualiza los datos en la base de datos. */
  editMarca(id:number, marca:Marca){
    return this.http.put(this.url+id,marca)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //Refrescar tablas//

  /**
   * La función actualizar $ devuelve el valor de la variable privada _refresh $.
   * @returns El observable que se devuelve es el que se crea en el constructor.
   */
  get refresh$(){
    return this._refresh$;
  }

}

/* Es una declaración de depuración. */
console.log("Conexion de Marcas!");

/* Una declaración de depuración. */
export interface Marca{
  id_Marca:number;
  nombre:string;
  descripcion:string;
};

