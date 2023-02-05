import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';
import{tap} from 'rxjs/operators'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexCategoriaService {
  @Output() disparadorDetalle: EventEmitter<any> = new EventEmitter();
  private url=API_URL+'categoria/';
  private _refresh$ = new Subject<void>();
  constructor(private http:HttpClient) { }
  
  //getProducto///
  getCategoria(){
    return this.http.get(this.url);
  };

  //get un Producto///
  getUnCategoria(id:number){
    return this.http.get(this.url+id)
  };

  ///Agregar///
  addCategoria(categoria:categoria){
    return this.http.post(this.url,categoria)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //Eliminar///
  deleteCategoria(id:string){
    return this.http.delete(this.url+id);

  };
  //Modificar
  editCategoria(id:number, categoria:categoria){
    return this.http.put(this.url+id,categoria)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //Refrescar tablas//
  get refresh$(){
    return this._refresh$;
  }
}

console.log("Servicio en USO Categoria");
export interface categoria{
  pk_id_categoria:number;
  nombre_cat:string;
  descripcion:string;
};