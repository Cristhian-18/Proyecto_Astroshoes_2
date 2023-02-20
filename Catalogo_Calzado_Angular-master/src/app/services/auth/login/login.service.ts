import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../api';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* Creando una variable llamada loginUrl y asignándole el valor de la constante API_URL más la cadena
  'login'. */
  private loginUrl = API_URL+'login';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

 /**
  * La función de inicio de sesión toma un objeto con una propiedad de correo electrónico y contraseña,
  * y devuelve un observable de tipo any
  * @param credentials - { correo electrónico: cadena, contraseña: cadena }
  * @returns Observable<cualquiera>
  */
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials, {headers: this.headers});
  }
}
