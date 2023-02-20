import { Component, OnInit } from '@angular/core';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css']
})
export class RegistrarCategoriaComponent implements OnInit {

  detalle:any={};
  ListaCategoria:categoria[]=[];
  id:string='';

  /* Creando un objeto de tipo `categoria` y asignándolo a la variable `categoria`. */
  categoria:categoria={
    pk_id_categoria:0,
    nombre_cat:'',
    descripcion:''
  };
  
 /**
  * La función constructora se llama cuando se crea una instancia del componente, y es el lugar
  * perfecto para colocar la lógica de inicialización.
  * @param {ConexCategoriaService} conexion - ConexCategoríaServicio
  */
  constructor( private conexion:ConexCategoriaService) {     
    this.ListaCategoria=<any>conexion.getCategoria();    
    this.conexion.disparadorCategoria.subscribe(data=>{
        this.detalle = data;
    });
  }

  ngOnInit(): void {
  }
  
  /**
   * Es una función que agrega una categoría a la base de datos.
   */
  agregarCategoria(){
    try {
      this.categoria.pk_id_categoria= (this.detalle)
      console.log(this.categoria);     
      if(this.categoria.pk_id_categoria !=0 && this.categoria.nombre_cat !='' && this.categoria.descripcion!=''){
        this.conexion.addCategoria(this.categoria).subscribe();
        this.Limpiar();  
        swal.fire({
          icon: 'success',
          title: 'Registro de Categoría Exitoso',
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
  
  /**
  * Limpia los datos del formulario.
  */
  Limpiar(){
    this.categoria.pk_id_categoria=0,
    this.categoria.nombre_cat='',
    this.categoria.descripcion=''
  }
}
