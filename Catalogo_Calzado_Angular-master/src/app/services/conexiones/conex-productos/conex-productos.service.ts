import { EventEmitter, Injectable, Output, ElementRef } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';
import { Subject } from 'rxjs';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConexProductosService {
  /* Un emisor de eventos. Se utiliza para emitir eventos. */
  @Output() disparadorDetalleProducto: EventEmitter<any> = new EventEmitter();

 /* Una variable a la que se le asigna un valor. */
  private url=API_URL+'producto/';
  /* Una variable privada que se utiliza para emitir eventos. */
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }
  
  
 /* Una función que devuelve el valor de la variable `url` */
  getProducto(){
    return this.http.get(this.url);
  };

 /* Una función que devuelve el valor de la variable `url`. */
  getUnProducto(id:number){
    return this.http.get(this.url+id)
  };


  /* Una función que agrega un nuevo producto a la base de datos. */
  addProducto(producto:Producto){
    return this.http.post(this.url,producto)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };


 
  /* Eliminación de un producto de la base de datos. */
  deletProducto(id:number){
    return this.http.delete(this.url+id);

  };
  
  
/* Una función que edita un producto en la base de datos. */
  editProducto(id:number, producto:Producto){
    return this.http.put(this.url+id,producto)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  /* Una variable privada a la que se le asigna un valor. */
  private Genero:Genero[]=[{genero:'Hombre'},{genero:'Mujer'},{genero:'Niños'}]
  
 /* Devolviendo el valor de la variable `Genero`. */
  getGenero()
  {return this.Genero};
 


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
console.log("Conexion de Producto!");



/* Definición de una interfaz para Producto */
export interface Producto{
  pk_id_producto:number;
  codigo_producto: string 
  img:string; 
  nombre_producto:string; 
  descripcion:string; 
  fk_marca:number; 
  modelo:string;
  genero:string; 
  talla:string; 
  costo:string;
  oferta:string;
  fk_id_categoria:number;
};
/* Definición de una interfaz para Genero */
export interface Genero{  
  genero:string;   
};

