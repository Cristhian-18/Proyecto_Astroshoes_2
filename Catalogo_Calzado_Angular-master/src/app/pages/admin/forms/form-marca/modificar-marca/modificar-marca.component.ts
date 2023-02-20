import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-modificar-marca',
  templateUrl: './modificar-marca.component.html',
  styleUrls: ['./modificar-marca.component.css']
})
export class ModificarMarcaComponent implements OnInit {

  cargar:any=[];
  id_entrada:number=0;

  subcription: Subscription = new Subscription();

  /* Una variable que se utiliza para almacenar los datos que se van a modificar. */
  marca:Marca={
    id_Marca:0,
    nombre:'',
    descripcion:''
  } 
  

 /**
  * Es un constructor que toma un parámetro de tipo ConexMarcaService y lo asigna a una variable
  * privada llamada conexión.
  * @param {ConexMarcaService} conexion - es el nombre del servicio
  */
  constructor( private conexion:ConexMarcaService) {
    this.CargaMarca();
  }

  /**
   * Se suscribe a un disparador, luego obtiene los datos del disparador y luego se suscribe a los
   * datos de la variable "cargar".
   */
  CargaMarca(){
    this.subcription.add(
      this.conexion.disparadorMarca.subscribe(data=>{
        this.conexion.getUnMarca(data).subscribe(
          res=>{
            console.log(res)         
            this.cargar=res;               
          },
          err => console.log('No existe')
        );
      })
    );
  }
  
  ngOnInit(): void {   
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
  }
  
 /**
  * Quiero actualizar los datos en la base de datos, pero quiero actualizar solo los datos que no
  * están vacíos, es decir, si el usuario no quiere cambiar los datos, no los actualiza. R: Puede usar
  * el método para obtener las claves del objeto y luego iterar sobre ellas para verificar si el valor está vacío o no.
  * @param {number} id - número,
  * @param {string} nombre - cadena,
  * @param {string} descripcion - cadena
  */
  modificar(id:number,nombre:string,descripcion:string){
     //Extrae text//
     this.marca.id_Marca = id;
     this.id_entrada =id;
     this.marca.nombre = nombre;
     this.marca.descripcion = descripcion;
    
    swal.fire({
      title: 'Seguro que quieres modificarlo?',
      text: "Seguro que quieres hacer esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificarlo!'
    }).then((result) => {
      if (result.value) {         
        try {   
          if(this.marca.id_Marca !=0 && this.marca.nombre !='' && this.marca.descripcion!=''){
            this.conexion.editMarca(this.id_entrada,this.marca).subscribe(
              res=>{
                console.log(res);       
              },
              err=>console.log(err)
            );
            
            swal.fire({
              icon: 'success',
              title: 'Se modificó el registro de Marcas Exitosamente',
              text: 'Continuar'
            });
          }else{
            swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por Favor!! Ingrese todos los parámetros'
            });
          }
        } catch (error) {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese todos los parametros Por favor'
          });
        } 
      }
    })    
  }
}
