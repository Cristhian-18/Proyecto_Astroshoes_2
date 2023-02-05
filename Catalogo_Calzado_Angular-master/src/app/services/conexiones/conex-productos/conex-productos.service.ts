import { EventEmitter, Injectable, Output, ElementRef } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';
import { Subject } from 'rxjs';
import{tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ConexProductosService {
  @Output() disparadorDetalle: EventEmitter<any> = new EventEmitter();
  private url=API_URL+'producto/';
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }
  
  //getProducto
  getProdcuto(){
    return this.http.get(this.url);
  };

  getAdministacion(){
    return this.http.get(this.url);
  };

  //get un Producto
  getUnProducto(id:number){
    return this.http.get(this.url+id)
  };

  ///Agregar
  addProdcuto(producto:Producto){
    return this.http.post(this.url,producto)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //eliminar
  deletproducto(id:number){
    return this.http.delete(this.url+id);

  };
  //modificar
  editproducto(id:number, producto:Producto){
    return this.http.put(this.url+id,producto)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  private Genero:Genero[]=[{genero:'Hombre'},{genero:'Mujer'},{genero:'Niños'}]
  //Listas de Genero
  getGenero()
  {return this.Genero};
  
  get refresh$(){
    return this._refresh$;
  }

}
console.log("Servicio en Uso PRODUCTO");

export interface Producto{
  pk_id_producto:number;
  codigo_producto:string; 
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
export interface Genero{  
  genero:string;   
};

