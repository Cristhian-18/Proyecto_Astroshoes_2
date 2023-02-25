import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { API_URL } from '../../api';
import { Subject } from 'rxjs';
import{tap} from 'rxjs/operators'

interface TokenPayload {
  user: {
    id: number;
    email: string;
    nombres: string;
    rol: string;
  },
  iat: number;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class ConexFavService {

 /* Una variable privada que se utiliza para almacenar la URL de la API. */
  private url = API_URL+'favoritos/';

 /* Un Sujeto que se usa para emitir un evento al componente principal. */
  private _refresh$ = new Subject<void>();
  /**
   * La función constructora es una función especial que se llama cuando se crea una nueva instancia de
   * la clase.
   * @param {HttpClient} http - HttpClient: este es el HttpClient angular que usaremos para realizar
   * las solicitudes HTTP.
   * @param {CookieService} cookieService - Este es el servicio que utilizaremos para configurar y
   * obtener cookies.
   */
  constructor(private http: HttpClient, private cookieService: CookieService) { }

/**
 * Envía una solicitud POST al servidor con el id del producto y el correo electrónico del usuario
 * @param {number} idProducto - número, correo electrónico: cadena
 * @param {string} email - email del usuario que está añadiendo el producto a la lista de favoritos
 * @returns La respuesta de la solicitud.
 */
  addFavorito(idProducto: number, email: string) {
    const body = { id_producto: idProducto, email: email };
    return this.http.post(this.url, body);
  }
 /**
  * Obtiene el token de la cookie, lo decodifica y devuelve el correo electrónico
  * @returns El correo electrónico del usuario.
  */
  getEmailFromToken() {
    const token = this.cookieService.get('token');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token) as TokenPayload;
    return decoded.user.email;
  }
  /**
   * Obtiene el token de la cookie, lo decodifica y devuelve la identificación del usuario
   * @returns El ID de usuario del token.
   */
  geIdFromToken() {
    const token = this.cookieService.get('token');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token) as TokenPayload;
    return decoded.user.id;
  }
  /**
   * Obtiene la identificación del token, luego realiza una solicitud de obtención al servidor y luego
   * emite un nuevo valor al sujeto _refresh$
   * @returns La lista de favoritos del usuario.
   */
  listarFavoritos() {
    const id = this.geIdFromToken();
    return this.http.get(this.url+id)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  /* Eliminación de un favorito de la base de datos. */
  deletFavorito(id:number){
    return this.http.delete(this.url+id);
  };
  /* Un método que devuelve la lista de favoritos del usuario. */
  getFavoritos(){
    return this.http.get(this.url);
  };
   //Refrescar tablas//
  /**
   * Devuelve el valor de la variable privada _refresh$
   * @returns El observable que se devuelve es el que se crea en el constructor.
   */
  get refresh$(){
    return this._refresh$;
  }
}
/* Es una declaración de depuración. */
console.log("Conexion de Favorito!");
/* Una interfaz que se utiliza para definir la estructura del objeto Favoritos. */
export interface Favoritos{
  id_favorito:number;
  fk_id_producto:number;
  fk_id_usuario:number;
};
