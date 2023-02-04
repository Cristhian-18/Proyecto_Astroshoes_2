import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class ConexMarcaService {
  @Output() disparadorMODIFICARMARCA: EventEmitter<any> = new EventEmitter();
  private url=API_URL+'marca/';
  constructor(private http:HttpClient) { }

  //getMarcas
  getMarcas(){
    return this.http.get(this.url);
};
 //get un Producto
 getUnmARCA(id_Marca:number){
  return this.http.get(this.url+id_Marca)
};
///Agregar
addMarca(marca:Marca){
  return this.http.post(this.url,marca);
};

//eliminar
deletemarca(id:number){
  return this.http.delete(this.url+id);

};
//editar
editmarca(id:number, marca:Marca){
  return this.http.put(this.url+id,marca);

};


}
console.log("Servicio en Uso MARCAS");
export interface Marca{
  id_Marca:number;
  nombre:string;
  descripcion:string;
};

