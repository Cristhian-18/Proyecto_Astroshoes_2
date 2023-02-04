import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-marca',
  templateUrl: './registrar-marca.component.html',
  styleUrls: ['./registrar-marca.component.css']
})
export class RegistrarMarcaComponent implements OnInit {


  detalle:any={};

  marca:Marca={
      id_Marca:0,
      nombre:'',
      descripcion:''
  } 
  ListaMarca:Marca[]=[];
  id:number=0;
  constructor( private conexion:ConexMarcaService) {     
    this.ListaMarca =<any>  conexion.getMarcas();    

    this.conexion.disparadorMODIFICARMARCA.subscribe(data=>{
        this.detalle = data;
    })
  }
  ngOnInit(): void {
  }
  
  agregarMarcas(){

    try {
      
      this.marca.id_Marca = (this.detalle)
      console.log(this.marca);
      
      if(this.marca.id_Marca !=0 && this.marca.nombre !='' && this.marca.descripcion!=''){
        this.conexion.addMarca(this.marca).subscribe();  
        swal.fire({
          icon: 'success',
          title: 'Registro de Marca Exitoso',
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
