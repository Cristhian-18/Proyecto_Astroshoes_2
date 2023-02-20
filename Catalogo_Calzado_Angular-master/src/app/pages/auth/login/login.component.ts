import { Component, ViewChild  } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

/* Una interfaz que se utiliza para definir la estructura del token que devuelve el servidor. */
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  @ViewChild('password', { static: false }) password: ElementRef;
  isShowingPassword: boolean = false;

  intentos: number = 0;
  segundosRestantes: number = 0;
  btnLogin: HTMLElement;

  /**
   * La función constructora es una función especial que se llama cuando se crea un objeto a partir de
   * una clase.
   * @param {LoginService} loginService - LoginService: este es el servicio que se utilizará para
   * llamar a la API de inicio de sesión
   * @param {Router} router - Enrutador: este es el servicio de enrutador angular.
   * @param {CookieService} cookieService - CookieService: este es el servicio que se utilizará para
   * establecer la cookie.
   * @param {ElementRef} elementRef - ElementRef: esta es la clase Angular ElementRef. Se utiliza para
   * obtener una referencia al elemento DOM.
   */
  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService, private elementRef: ElementRef) {
    this.btnLogin = document.getElementById('btnLogin')!;
    this.password = this.elementRef.nativeElement.querySelector('#password');
  }

  /**
   * Si el tipo de entrada es contraseña, cámbielo a texto y establezca isShowingPassword en verdadero.
   * De lo contrario, cámbielo a contraseña y establezca isShowingPassword en falso.
   */
  togglePassword() {
    const inputType = this.password.nativeElement.type;
    if (inputType === 'password') {
        this.password.nativeElement.type = 'text';
        this.isShowingPassword = true;
    } else {
        this.password.nativeElement.type = 'password';
        this.isShowingPassword = false;
    }
  }

  /**
   * Si el usuario ha intentado iniciar sesión 3 veces, deshabilite el botón de inicio de sesión
   * durante 60 segundos; de lo contrario, si el usuario ha intentado iniciar sesión menos de 3 veces,
   * inicie sesión.
   * @param {string} email - cadena, contraseña: cadena
   * @param {string} password - cadena
   */
  loginClick(email: string, password: string) {

    if (this.intentos === 2) {
      this.segundosRestantes = 60;
      const interval = setInterval(() => {
        if (this.segundosRestantes === 0) {
          clearInterval(interval);
          this.intentos = 0;
          document.getElementById("btnLogin")!.removeAttribute("disabled");
        } else {
          this.segundosRestantes--;
        }
      }, 1000);
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Ha alcanzado el límite de intentos. Por favor intente de nuevo en ${this.segundosRestantes} segundos`
      });
      document.getElementById("btnLogin")!.setAttribute("disabled", "true");

    } else {
      const loginData = {
        email: email,
        password: password
      };
      this.loginService.login(loginData).subscribe(
        (res) => {
          this.cookieService.set('token', res.token);
          const tokenInfo = jwt_decode(res.token) as TokenPayload;
          if (tokenInfo.user.rol === 'admin') {
            this.router.navigate(['/admin/form-inicio']);
          } else {
            this.router.navigate(['/home']);
          }
          swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido ' + tokenInfo.user.nombres
          });
        },
        (err) => {
          this.intentos++;
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos. Te quedan ' + (3 - this.intentos) + ' intentos'
          });
        }
      );
    } 
  }
}
