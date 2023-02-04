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
