import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

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

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {

  isLoggedIn: boolean;
  decodedToken: any;
  nombreUsuario: string | undefined;
  /**
   * Si el usuario tiene un token, entonces el usuario está conectado
   * @param {CookieService} cookieService - Este es el servicio que importamos de ngx-cookie-service.
   * @param {Router} router - Enrutador: este es el servicio de enrutador angular.
   */
  constructor(private cookieService: CookieService, private router: Router) {
    const token = cookieService.get('token');
    if (token) {
      const decoded = jwt_decode(token) as TokenPayload;
      this.nombreUsuario = decoded.user.nombres;
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  /**
   * Elimina la cookie de token y luego navega a la página de inicio
   */
  logout() {
    this.cookieService.delete('token');
    swal.fire({
      title: '¡Cierre de sesión exitoso!',
      text: 'Esperamos verte pronto.',
      icon: 'success'
    });
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
