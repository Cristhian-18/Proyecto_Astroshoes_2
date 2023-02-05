import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';

@Component({
  selector: 'app-modificar-marca',
  templateUrl: './modificar-marca.component.html',
  styleUrls: ['./modificar-marca.component.css']
})
export class ModificarMarcaComponent implements OnInit {

  cargar:any=[];
  id_entrada:number=0;
  subcription: Subscription = new Subscription();
  marca:Marca={
    id_Marca:0,
    nombre:'',
    descripcion:''
  } 
  

  constructor( private conexion:ConexMarcaService) {
    this.ListarCarga();
  }

  ListarCarga(){
    this.subcription.add(
      this.conexion.disparadorMODIFICARMARCA.subscribe(data=>{
        this.conexion.getUnmARCA(data).subscribe(
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
  
  modificar(id:number,nombre:string,descripcion:string){
    //Extrae text//
    this.marca.id_Marca = id;
    this.id_entrada =id;
    this.marca.nombre = nombre;
    this.marca.descripcion = descripcion;
  
    //Envia a la base de datos//
    this.conexion.editmarca(this.id_entrada,this.marca).subscribe(
       res=>{
         console.log(res);       
       },
       err=>console.log(err)
    ); 
  }  
}
