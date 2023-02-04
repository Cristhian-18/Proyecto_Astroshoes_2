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
  
  categoria:categoria={

    pk_nombre_cat:'',
    id_categoria:0,
    descripcion:''
  };
  
  ListaCategoria:categoria[]=[];
  id:string='';

  constructor( private conexion:ConexCategoriaService) {     
    this.ListaCategoria=<any>  conexion.getCategoria();    

    this.conexion.disparadorDetalle.subscribe(data=>{
        this.detalle = data;
    })
  }

  ngOnInit(): void {
  }
  
  agregarCategoria(){

    try {
      
      this.categoria.id_categoria= (this.detalle)
      console.log(this.categoria);
      
      if(this.categoria.id_categoria !=0 && this.categoria.pk_nombre_cat !='' && this.categoria.descripcion!=''){
        this.conexion.addCategoria(this.categoria).subscribe();  
        swal.fire({
          icon: 'success',
          title: 'Registro de Categoria Exitoso',
          text: 'Continuar'
        });
      }else{
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por Favor!! Ingrese todos los parametros'
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



}
