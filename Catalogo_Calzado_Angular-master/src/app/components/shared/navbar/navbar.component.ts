import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConexProductosService, Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {

  keyword = 'nombre_producto';
  data: Producto[] = [];
  informacionGuardada: any;

  @Input() dataEntrante: any;
  info_modal: boolean = false;

  onChangeSearch(val: string) {
  }

  isLoggedIn: boolean;
  decodedToken: any;
  nombreUsuario: string | undefined;
  public userRole: boolean | undefined;
  public admin: boolean | undefined;


  constructor(private cookieService: CookieService, private router: Router, private canexproduc: ConexProductosService) {
    const token = cookieService.get('token');
    //this.userRole = this.verifyRole();
    if (token) {
      const decoded = jwt_decode(token) as TokenPayload;
      this.nombreUsuario = 'Bienvenido ' + decoded.user.nombres;
      this.isLoggedIn = true;
      if (decoded.user.rol === 'user') {
        this.userRole = true;
      }
      if (decoded.user.rol === 'admin') {
        this.admin = true;
      }
    } else {
      this.isLoggedIn = false;
      this.nombreUsuario = '';
    }
  }

  getNombres(nombre: number) {
    this.dataEntrante = nombre;
    this.canexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

  renderSelectedValue(item: any) {
    //console.log(item);
    return this.informacionGuardada = item.pk_id_producto;
  }


  listarProductos() {
    console.log("Servicio ULTIMA NOVEDAD");
    this.canexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.data = <any>res;

      },
      err => console.log(err)

    );
  }
  ngOnInit(): void {
    this.listarProductos();
  }
  logout() {
    this.cookieService.delete('token');
    this.isLoggedIn = false;
    this.nombreUsuario = '';
    swal.fire({
      title: '¡Cierre de sesión exitoso!',
      text: 'Esperamos verte pronto.',
      icon: 'success'
    });
    this.router.navigate(['/home']);
  }
  abrirmodal() {
    this.info_modal = true;
    this.getNombres(this.informacionGuardada);
  }

}
