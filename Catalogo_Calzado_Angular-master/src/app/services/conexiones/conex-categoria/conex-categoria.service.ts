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
  getUnCategoria(id:string){
    return this.http.get(this.url+id)
  };

  ///Agregar
  addCategoria(producto:categoria){
    return this.http.post(this.url,producto);
  };

  //eliminar
  deleteCategoria(id:string){
    return this.http.delete(this.url+id);

  };
  //modificar
  editCategoria(id:string, producto:categoria){
    return this.http.put(this.url+id,producto);

  };
}
console.log("Servicio en Uso PRODUCTO");
export interface categoria{
  pk_nombre_cat:string;
  id_categoria:number;
  descripcion:string;
};