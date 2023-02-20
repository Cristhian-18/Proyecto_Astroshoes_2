import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../../api';

/* Una interfaz TypeScript que define la estructura del token. */
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
export class VerifyTokenService {

  private url = API_URL+'verifyToken'; // URL de tu API para verificar el token

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

/**
 * Envía una solicitud a la API para verificar el token y, si el token no es válido, redirige al
 * usuario a la página de inicio de sesión.
 */
  verifyToken() {
    // Obtener el token de las cookies
    const token = this.cookieService.get('token');


    // Enviar petición a la API para verificar el token
    this.http.post(this.url, { token }).subscribe(
      (response) => {
        // Si el token es válido, continuar con la navegación normal

      },
      (error) => {
        // Si el token es inválido, redirigir al usuario a la página de inicio
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No estás logueado, por favor inicia sesión.'
        });
        this.router.navigateByUrl('/login');
      }
    );
  }

  /**
   * Envía una solicitud al servidor con el token almacenado en la cookie y, si el token es válido,
   * devuelve el rol del usuario; de lo contrario, redirige al usuario a la página de inicio.
   * @returns Una promesa que se resuelve en una cadena.
   */
  getRole(): Promise<string> {
    return new Promise((resolve, reject) => {
      const token = this.cookieService.get('token');
      this.http.post(this.url, { token }).subscribe(
        (response) => {
          // Si el token es válido, continuar con la navegación normal
          const token = this.cookieService.get('token');
          const decoded = jwt_decode(token) as TokenPayload;
          resolve(decoded.user.rol);
        },
        (error) => {
          // Si el token es inválido, redirigir al usuario a la página de inicio
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No resuelve la promesa, no se pudo obtener el rol'
          });
          this.router.navigateByUrl('/home');
          reject(null);
        }
      );
    });
  }

}
