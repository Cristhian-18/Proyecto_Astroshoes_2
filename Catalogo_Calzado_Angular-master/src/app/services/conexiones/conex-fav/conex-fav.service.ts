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

  private url = API_URL+'favoritos/';
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  addFavorito(idProducto: number, email: string) {
    const body = { id_producto: idProducto, email: email };
    return this.http.post(this.url, body);
  }
  getEmailFromToken() {
    const token = this.cookieService.get('token');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token) as TokenPayload;
    return decoded.user.email;
  }
  geIdFromToken() {
    const token = this.cookieService.get('token');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token) as TokenPayload;
    return decoded.user.id;
  }
  listarFavoritos() {
    const id = this.geIdFromToken();
    return this.http.get(this.url+id)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  deletFavorito(id:number){
    return this.http.delete(this.url+id);

  };

  getFavoritos(){
    return this.http.get(this.url);
  };

   //Refrescar tablas//
   get refresh$(){
    return this._refresh$;
  }

}
export interface Favoritos{
  
  id_favorito:number;
  fk_id_producto:number;
  fk_id_usuario:number;
  
};
