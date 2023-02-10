import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class ConexUsuariosService {

  private url=API_URL+'usuario/';
  constructor(private http:HttpClient) { }

  //getUsuarios
  getUsuario(){
    return this.http.get(this.url);
  };

  //Eliminar usuario//
  deleteUsuario(id:number){
    return this.http.delete(this.url+id);
  };
}

console.log('Servicio en USO Usuarios')
export interface Usuario{
  id_usuario:number;
  nombres: string  
  apellidos:string; 
  email:string; 
  password:string;
  created_at:string,
  rol:string;
};



