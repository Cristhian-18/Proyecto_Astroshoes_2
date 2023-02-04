import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';

@Component({
  selector: 'app-modificar-marca',
  templateUrl: './modificar-marca.component.html',
  styleUrls: ['./modificar-marca.component.css']
})
export class ModificarMarcaComponent implements OnInit {
  /*
  cargar:any={
    id:0,
    name:'',
    email:''
    
    
  };
*/
cargar:any=[];

  constructor( private conexion:ConexMarcaService) {

    this.conexion.disparadorMODIFICARMARCA.subscribe(data=>{
       this.conexion.getUnmARCA(data).subscribe(
        res=>{
          console.log(res)         
          this.cargar=res;               
        },
        err => console.log('Hola')
       );
  
     })

   }
  
  marca:Marca={
    id_Marca:0,
    nombre:'',
    descripcion:''
} 
  id_entrada:number=0;

 
  
  modificar(id:number,nombre:string,descripcion:string){
    //Extrae text//
    this.marca.id_Marca = id;
    this.id_entrada =id;
    this.marca.nombre = nombre;
    this.marca.descripcion = descripcion;
  
    //Envia a la base de datos
    this.conexion.editmarca(this.id_entrada,this.marca).subscribe(
       res=>{
         console.log(res);       
       },
       err=>console.log(err)
     );
    
  } 
  ngOnInit(): void { 
    
  }
  
}
