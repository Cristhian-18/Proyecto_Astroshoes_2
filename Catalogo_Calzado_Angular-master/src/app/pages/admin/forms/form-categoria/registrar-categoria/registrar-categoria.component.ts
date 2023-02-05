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

  categoria:categoria={
    pk_id_categoria:0,
    nombre_cat:'',
    descripcion:''
  };
  
  constructor( private conexion:ConexCategoriaService) {     
    this.ListaCategoria=<any>conexion.getCategoria();    
    this.conexion.disparadorDetalle.subscribe(data=>{
        this.detalle = data;
    });
  }

  ngOnInit(): void {
  }
  
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

  Limpiar(){
    this.categoria.pk_id_categoria=0,
    this.categoria.nombre_cat='',
    this.categoria.descripcion=''
  }
}
