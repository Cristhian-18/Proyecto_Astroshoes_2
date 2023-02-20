import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.css']
})
export class ModificarCategoriaComponent implements OnInit {
  detalle:any={};
  subcription: Subscription = new Subscription();
  cargar:any=[];
   /* Una variable que se utiliza para almacenar los datos que se van a modificar. */
  categoria:categoria={
    pk_id_categoria:0,
    nombre_cat:'',
    descripcion:''
  };


 /**
  * Un constructor que se utiliza para inicializar los miembros de la clase.
  * @param {ConexCategoriaService} conexion - es el nombre del servicio
  */
  constructor(private conexion:ConexCategoriaService) { 
    this.ListarCarga();
  }

  /**
   * Es una función que se suscribe a un sujeto, y luego se suscribe a un observable que es devuelto
   * por una función que llama el sujeto.
   * </código>
   */
  ListarCarga(){
    this.subcription.add(
      this.conexion.disparadorCategoria.subscribe(data=>{
        this.conexion.getUnCategoria(data).subscribe(
        res=>{
          console.log(res)         
          this.cargar=res;               
        },
        err => console.log('Hola')
        );
      })
    );
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
   * @param {string} descripcion - cadena;
   */
  modificar(id:number,nombre:string,descripcion:string){
    //Extrae text//
    this.categoria.pk_id_categoria = id;
    this.categoria.nombre_cat= nombre;
    this.categoria.descripcion = descripcion;
    
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
          if(this.categoria.pk_id_categoria !=0 && this.categoria.nombre_cat !='' && this.categoria.descripcion!=''){
            this.conexion.editCategoria(this.categoria.pk_id_categoria,this.categoria).subscribe(
              res=>{
                console.log(res);       
              },
              err=>console.log(err)
            );
            
            swal.fire({
              icon: 'success',
              title: 'Se modificó el registro de Categoría Exitosamente',
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
 

  ngOnInit(): void {
  }
}
