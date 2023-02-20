import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  /* Definiendo una variable llamada `registerUrl` y asignándole el valor de `API_URL+'register'`. */
  private registerUrl = API_URL+'register';

  constructor(private http: HttpClient) { }

  /**
   * Toma un objeto de datos como parámetro y devuelve el resultado de una solicitud posterior a
   * registerUrl
   * @param data - {nombres: cadena, apellidos: cadena, correo electrónico: cadena, contraseña: cadena}
   * @returns La respuesta del servidor.
   */
  register(data: {nombres: string, apellidos: string, email: string, password: string}){
    return this.http.post(this.registerUrl, data);
  }
}
