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

  @ViewChild('password', { static: false }) password: ElementRef;
  isShowingPassword: boolean = false;

  constructor(private registerService: RegisterService, private router: Router, private elementRef: ElementRef) {
    this.password = this.elementRef.nativeElement.querySelector('#password');
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}


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
