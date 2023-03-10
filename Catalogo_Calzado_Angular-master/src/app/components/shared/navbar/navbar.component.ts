import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  isLoggedIn: boolean;
  decodedToken: any;
  nombreUsuario: string | undefined;
  public userRole: boolean | undefined;
  public admin: boolean | undefined;

  subcription: Subscription = new Subscription();

  @Input() dataEntrante: any;
  info_modal: boolean = false;

  onChangeSearch(val: string) {
  }
  
  /**
   * Si el usuario ha iniciado sesión, se muestra el nombre del usuario; de lo contrario, no.
   * @param {CookieService} cookieService - servicio de cookies,
   * @param {Router} router - enrutador
   * @param {ConexProductosService} conexionProducto - ConexProductosServicio
   */
  constructor(private cookieService: CookieService, private router: Router, private conexionProducto: ConexProductosService) {
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
  
  ngOnInit(): void {
    this.listarProductos();
    
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  //**** Método de redireccionamiento, donde le pasamos un parametro de tipo string la ruta inicial a donde queremos llegar****/
  //** Funcional para direccionamiento entre componentes de las pages **//
  redirectAndScrollToTop(route: string) {
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  /**
   * "Cuando el usuario hace clic en el botón, se llama a la función getIDProducto(), que emite la
   * variable dataEntrante al componente padre".
   * </código>
   */
  getIDProducto() {
     this.conexionProducto.disparadorDetalleProducto.emit(this.dataEntrante);
  }

  /**
   * Toma el valor del ítem seleccionado y lo asigna a la variable dataEntrante.
   * @param {any} item - cualquiera =&gt; El elemento que se selecciona
   */
  renderSelectedValue(item: any) {
    console.log(item.pk_id_producto);
    this.dataEntrante = item.pk_id_producto;
  }

  //** Listar los productos del servicio **//
  listarProductos() {
    console.log("Servicio ULTIMA NOVEDAD");
    this.subcription.add(
    this.conexionProducto.getProducto().subscribe(
      res => {
        console.log(res)
        this.data = <any>res;
      },
      err => console.log(err)
    )
    );
  }

  //** Método que permite desloguearse de la cuenta, y envia un mensaje al usuario de ´Cierre de sesion exitoso´  **/// 
  
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


 /**
  * Establece el valor de la variable info_modal en verdadero.
  */
  abrirmodal() {
    this.info_modal = true;
  }
}
