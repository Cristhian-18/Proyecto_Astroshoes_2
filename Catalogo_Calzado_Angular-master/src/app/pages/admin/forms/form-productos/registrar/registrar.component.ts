import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService, Producto,Genero } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  ListaMarca:Marca[]=[];
  ListaCategoria:categoria[]=[];
  ListaGenero: Genero[]=[];//LISTA DE Genero
  detalle:any={};
  modal_admin:boolean  = false;
  bandera:boolean  = false;
  bandera_categoria:boolean  = false;
  bandera_marca:boolean  = false;
  bandera_genero:boolean  = false;
  bandera_total:boolean  = false;
  valicat:number  = 0;
  valimarc:number  = 0;
  valigen:number  = 0;


  Producto:Producto={
    pk_id_producto: 0,
    codigo_producto:'', 
    img:'', 
    nombre_producto:'',
    descripcion:'',
    fk_marca:0, 
    modelo:'',
    genero:'',
    talla:'',
    costo:'',
    oferta:'',
    fk_id_categoria:0
  };
  
 
  constructor(private ConexProductoService:ConexProductosService, private ConexMarca:ConexMarcaService, private ConexCategoria:ConexCategoriaService) {
    this.ConexProductoService.disparadorDetalle.subscribe(data=>{
      this.detalle = data;
      this.Producto.oferta = 'No Oferta';
    });
  }

  ngOnInit(): void {
    this.listarMarcas();
    this.listaCategoria();   
    this.listarGenero();
  }
  
  //Lista u obtiene las CATEGORIAS del servicio//
  listaCategoria(){
    console.log("--- Listar Categoria de productos --");
    this.ConexCategoria.getCategoria().subscribe(
      res=>{
      // console.log(res)
        this.ListaCategoria=<any>res;         
      },
      err => console.log(err)   
    );
  } 

  //Lista u obtiene las MARCAS del servicio//
  listarMarcas(){
    console.log("----Listar Marcas de productos----");
    this.ConexMarca.getMarcas().subscribe(
      res=>{
      // console.log(res)
        this.ListaMarca=<any>res;       
      },
      err => console.log(err) 
    );
  } 


  listarGenero(){
  this.ListaGenero= this.ConexProductoService.getGenero();
  } 

  obtenercategoria(valor: string) {
    this.Producto.fk_id_categoria = parseInt(valor); 
    this.valicat = parseInt(valor); 
    
    console.log(valor);
  }
  validacategoria() { 
    
    if( this.valicat != 0 ){
        this.bandera_categoria = true
    }else{
      this.bandera_categoria = false;
    }
     return this.bandera_categoria;
  }

  obtenerMarca(valor: string) {
    this.Producto.fk_marca = parseInt(valor); 
    this.valimarc = parseInt(valor); 

    console.log(valor);
  }
  validamarca() { 
    
    if( this.valimarc != 0 ){
        this.bandera_marca = true
    }else{
      this.bandera_marca  = false;
    }
     return this.bandera_marca;
  }
  

  obtenercGenero(valor: string) {
    this.Producto.genero = valor;
    this.valigen = parseInt(valor); 
    console.log(valor);
  }
  validagenero() { 
    
    if( this.valigen != 0 ){
        this.bandera_genero = true
    }else{
      this.bandera_genero  = false;
    }
     return this.bandera_genero;
  }
  
  obtenerOferta(valor: boolean) {
    if(valor == true){
      this.Producto.oferta = 'Oferta';
      console.log('Oferta');
    }else{
      this.Producto.oferta = 'No Oferta';
      console.log('No Oferta');
    }
  }
  validaTodo() { 
    console.log(this.bandera_categoria)
    console.log(this.bandera_marca)
    console.log(this.bandera_genero)
    if(this.bandera_categoria  != false && this.bandera_marca !=false && this.bandera_genero !=false){
        this.bandera_total=true;
        
    }else{
      this.bandera_total=false;
    }
     return this.bandera_total;
  }

/*
  agregarProducto(){
    this.Producto.pk_id_producto = (this.detalle)
    console.log(this.Producto);
    this.ConexProductoService.addProdcuto(this.Producto).subscribe();  
    this.Limpiar(); 
  }
  */
  agregarProducto(){
    try {  
      this.Producto.pk_id_producto = (this.detalle)
      console.log(this.Producto);
      
      if(this.Producto.pk_id_producto != 0 && this.Producto.codigo_producto !='' && this.Producto.img!='' && this.Producto.nombre_producto!=''
         && this.Producto.descripcion!='' && this.Producto.fk_marca !=0 && this.Producto.modelo!='' && this.Producto.genero !='' && this.Producto.talla !=''
         && this.Producto.costo !='' && this.Producto.oferta !='' && this.Producto.fk_id_categoria !=0){
        this.ConexProductoService.addProdcuto(this.Producto).subscribe();
        this.Limpiar();  
        swal.fire({
          icon: 'success',
          title: 'Registro de Producto Exitoso',
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
  
  Verificar(){
  
      if(this.Producto.pk_id_producto != 0 && this.Producto.codigo_producto !='' && this.Producto.img!='' && this.Producto.nombre_producto!=''
      && this.Producto.descripcion!='' && this.Producto.fk_marca !=0 && this.Producto.modelo!='' && this.Producto.genero !='' && this.Producto.talla !=''
      && this.Producto.costo !='' && this.Producto.oferta !='' && this.Producto.fk_id_categoria !=0){
        this.bandera = true;
       swal.fire({
         icon: 'success',
         title: 'Registro de Producto Exitoso',
         text: 'Continuar'
       });
       }else{
         swal.fire({
           icon: 'error',
           title: 'Error',
           text: 'Por Favor!! Ingrese todos los parametros'
         });
     }
    //return this.bandera;
  }


  Limpiar(){
    this.Producto.pk_id_producto= 0,
    this.Producto.codigo_producto='', 
    this.Producto.img='', 
    this.Producto.nombre_producto='',
    this.Producto.descripcion='',
    this.Producto.fk_marca=0, 
    this.Producto.modelo='',
    this.Producto.genero='',
    this.Producto.talla='',
    this.Producto.costo='',
    this.Producto.oferta='',
    this.Producto.fk_id_categoria=0
  }
}
