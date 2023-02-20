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
  ListaMarca:Marca[]=[];
  id:number=0;

 /* Un cargar marca. */
  marca:Marca={
      id_Marca:0,
      nombre:'',
      descripcion:''
  } 
  /*
  marca:any={
    id_Marca:[0,Validators.required],
    nombre:['',Validators.required],
    descripcion:['',Validators.required]
} 
 */

  /**
   * La función constructora se llama cuando se crea una instancia del componente, y es el lugar
   * perfecto para colocar la lógica de inicialización.
   * @param {ConexMarcaService} conexion - ConexMarcaServicio
   */
  constructor( private conexion:ConexMarcaService) {     
    this.ListaMarca =<any>  conexion.getMarcas();    
    this.conexion.disparadorMarca.subscribe(data=>{
        this.detalle = data;
    })
  }


  ngOnInit(): void {
  }
  
  /**
   * Toma los datos del formulario y los envía al backend para almacenarlos en la base de datos.
   */
  agregarMarcas(){
    try {  
      this.marca.id_Marca = (this.detalle)
      console.log(this.marca);
      
      if(this.marca.id_Marca !=0 && this.marca.nombre !='' && this.marca.descripcion!=''){
        this.conexion.addMarca(this.marca).subscribe();  
        this.Limpiar();
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

 /**
  * Limpia los datos del formulario.
  */
  Limpiar(){
    this.marca.id_Marca=0,
    this.marca.nombre='',
    this.marca.descripcion='';
  }
}
