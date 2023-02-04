import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
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
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  
  async canActivate(): Promise<boolean> {
    try {
      const token = this.cookieService.get('token');
      const decoded = jwt_decode(token) as TokenPayload;
      const role = decoded.user.rol;
      // Comprobar si el rol es 'admin'
      if (role !== 'admin') {
        // Si no es administrador, redirigir al usuario a la página de inicio
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No tienes permiso para acceder a esta página.'
        });
        this.router.navigateByUrl('/home');
        return false;
      }
      // Si es administrador, permitir la navegación
      return true;
    } catch (error) {
      // Si el token es inválido, redirigir al usuario a la página de inicio
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tienes permiso a esta ruta, por favor inicia sesion.'
      });
      this.router.navigateByUrl('/home');
      return false;
    }
  }

  isUser(): boolean {
    const token = this.cookieService.get('token');
    const decoded = jwt_decode(token) as TokenPayload;
    const role = decoded.user.rol;
    if (!token) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No esta logeado.'
      });
        this.router.navigate(['/login']);
        return false;
    }
    if (role!== 'user') {
        this.router.navigate(['/']);
        return false;
    }
    return true;
  }
  
}
