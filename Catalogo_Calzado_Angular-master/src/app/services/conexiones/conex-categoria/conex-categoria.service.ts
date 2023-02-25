import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';
import{tap} from 'rxjs/operators'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexCategoriaService {

  /* Un emisor de eventos. */
  @Output() disparadorCategoria: EventEmitter<any> = new EventEmitter();

  /* Una variable privada que se utiliza para almacenar la URL de la API. */
  private url=API_URL+'categoria/';

  
  /* Un Sujeto que se usa para emitir un evento al componente principal. */
  private _refresh$ = new Subject<void>();
  constructor(private http:HttpClient) { }
  
  
  /* Una función que devuelve los datos de la API. Metodo SELECT */
  getCategoria(){
    return this.http.get(this.url);
  };

  
 /* Una función que devuelve los datos de la API. Metodo SELECT */
  getUnCategoria(id:number){
    return this.http.get(this.url+id)
  };

 
  /* Una función que agrega una nueva categoría a la base de datos. */
  addCategoria(categoria:categoria){
    return this.http.post(this.url,categoria)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };


 /* Eliminación de una categoría de la base de datos. */
  deleteCategoria(id:number){
    return this.http.delete(this.url+id);
  };
  
  
/* Una función que actualiza los datos en la base de datos. */
  editCategoria(id:number, categoria:categoria){
    return this.http.put(this.url+id,categoria)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //Refrescar tablas//
 /**
  * Esta función devuelve un observable que emite un valor cada vez que se establece la propiedad
  * refresh$.
  * @returns El getter está devolviendo la propiedad privada _refresh$
  */
  get refresh$(){
    return this._refresh$;
  }
}

/* Es una declaración de depuración. */
console.log("Conexion de Categoria!");
/* Definición de la interfaz para los datos que se devolverán desde la API. */
export interface categoria{
  pk_id_categoria:number;
  nombre_cat:string;
  descripcion:string;
};