import { Component, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { RegisterService } from 'src/app/services/auth/register/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  /* Este es un decorador que nos permite acceder al elemento DOM con la contraseña de identificación. */
  @ViewChild('password', { static: false }) password: ElementRef;
  isShowingPassword: boolean = false;

  /**
   * La función constructora es una función especial que se llama cuando se crea un objeto a partir de
   * una clase.
   * @param {RegisterService} registerService - Este es el servicio que creamos anteriormente.
   * @param {Router} router - Enrutador: este es el servicio de enrutador angular.
   * @param {ElementRef} elementRef - ElementRef: esta es una referencia al elemento DOM al que se
   * adjunta la directiva.
   */
  constructor(private registerService: RegisterService, private router: Router, private elementRef: ElementRef) {
    this.password = this.elementRef.nativeElement.querySelector('#password');
  }

/**
 * Devuelve verdadero si el correo electrónico es válido y falso si no lo es.
 * @param {string} email - La dirección de correo electrónico a validar.
 * @returns Un valor booleano.
 */
  validateEmail(email: string): boolean {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }


  /**
   * Si el tipo de entrada es contraseña, cámbielo a texto y establezca isShowingPassword en verdadero.
   * De lo contrario, cámbielo a contraseña y establezca isShowingPassword en falso
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
   * La función recibe los datos del formulario, los valida y los envía al backend
   * @param {string} nombres - cadena, apellidos: cadena, correo electrónico: cadena, contraseña:
   * cadena
   * @param {string} apellidos - cadena,
   * @param {string} email - La dirección de correo electrónico del usuario.
   * @param {string} password - La contraseña para el usuario.
   */
  onSubmit(nombres: string, apellidos: string, email: string, password: string) {
    
    
    const registerData = {
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      password: password
    };

    if (!nombres || !apellidos || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios'
      });
    }else{
      if (!this.validateEmail(email)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor ingrese un correo válido'
        });
      } else {
        this.registerService.register(registerData).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Bienvenido ' + nombres + ' ' + apellidos
          })
          this.router.navigate(['/login']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El email ya se encuentra registrado'
          })
        });
      }
    }
  }
}
