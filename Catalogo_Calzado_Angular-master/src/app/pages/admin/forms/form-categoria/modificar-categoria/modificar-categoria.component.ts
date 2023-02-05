import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.css']
})
export class ModificarCategoriaComponent implements OnInit {
  detalle:any={};
  subcription: Subscription = new Subscription();
  cargar:any=[];
  categoria:categoria={
    pk_id_categoria:0,
    nombre_cat:'',
    descripcion:''
  };


  constructor(private conexion:ConexCategoriaService) { 
    this.ListarCarga();
  }

  ListarCarga(){
    this.subcription.add(
      this.conexion.disparadorDetalle.subscribe(data=>{
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

  
  modificar(id:number,nombre:string,descripcion:string){
    //Extrae text//
    this.categoria.pk_id_categoria = id;
    this.categoria.nombre_cat= nombre;
    this.categoria.descripcion = descripcion;
  
    //Envia a la base de datos
    this.conexion.editCategoria(this.categoria.pk_id_categoria,this.categoria).subscribe(
       res=>{
         console.log(res);       
       },
       err=>console.log(err)
     );   
  } 


  ngOnInit(): void {
  }
}
