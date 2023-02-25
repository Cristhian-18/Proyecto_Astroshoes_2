import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class ConexUsuariosService {

  /* Una variable a la que se le asigna un valor. */
  private url=API_URL+'usuario/';
  constructor(private http:HttpClient) { }
  /* Una función que devuelve el valor de la variable `url` */
  getUsuario(){
    return this.http.get(this.url);
  };
  /* Una función que elimina un usuario de la base de datos. */
  deleteUsuario(id:number){
    return this.http.delete(this.url+id);
  };
}
/* Es una declaración de depuración. */
console.log("Conexion de Usuario!");
/* Definición de una interfaz para Usuario */
export interface Usuario{
  id_usuario:number;
  nombres: string  
  apellidos:string; 
  email:string; 
  password:string;
  created_at:string,
  rol:string;
};



