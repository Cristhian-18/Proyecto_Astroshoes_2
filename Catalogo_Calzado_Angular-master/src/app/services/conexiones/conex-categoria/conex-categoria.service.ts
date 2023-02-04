import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class ConexCategoriaService {
  @Output() disparadorDetalle: EventEmitter<any> = new EventEmitter();
  private url=API_URL+'categoria/';
  constructor(private http:HttpClient) { }
  
  //getProdcut
  getCategoria(){
    return this.http.get(this.url);
  };

  //get un Producto
  getUnCategoria(id:number){
    return this.http.get(this.url+id)
  };

  ///Agregar
  addCategoria(categoria:categoria){
    return this.http.post(this.url,categoria);
  };

  //eliminar
  deleteCategoria(id:string){
    return this.http.delete(this.url+id);

  };
  //modificar
  editCategoria(id:number, categoria:categoria){
    return this.http.put(this.url+id,categoria);

  };
}
console.log("Servicio en Categoria");
export interface categoria{
  pk_id_categoria:number;
  nombre_cat:string;
  descripcion:string;
};