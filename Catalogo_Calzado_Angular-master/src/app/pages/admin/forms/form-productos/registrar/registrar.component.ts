import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService, Producto,Genero } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  ListaMarca:Marca[]=[];
  ListaCategoria:categoria[]=[];
  ListaGenero: Genero[]=[];//LISTA DE Genero

  modal_admin:boolean  = false;

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
    fk_nombre_categoria:''
  };
  detalle:any={};
 
  constructor(private ConexProdcutoService:ConexProductosService, private ConexMarca:ConexMarcaService, private ConexCategoria:ConexCategoriaService) {

    this.ConexProdcutoService.disparadorDetalle.subscribe(data=>{
      this.detalle = data;
      this.Producto.oferta = 'No Oferta';
  })

   }

  ngOnInit(): void {
    this.listarMarcas();
    this.listaCategoria();   
    this.listarGenero();
  }
  
  listaCategoria()
  {
  console.log("Servicio ULTIMA NOVEDAD");
  this.ConexCategoria.getCategoria().subscribe(
    res=>{
     // console.log(res)
      this.ListaCategoria=<any>res;         
    },
    err => console.log(err)   
  );
  } 

  listarMarcas()
  {
  console.log("Servicio ULTIMA NOVEDAD");
  this.ConexMarca.getMarcas().subscribe(
    res=>{
     // console.log(res)
      this.ListaMarca=<any>res;
           
    },
    err => console.log(err)
    
  );
  } 
  listarGenero()
  {
  this.ListaGenero= this.ConexProdcutoService.getGenero();
    
   
  } 
  obtenercategoria(valor: string) {
    this.Producto.fk_nombre_categoria = valor; 
    console.log(valor);
  }
  obtenerMarca(valor: string) {
    this.Producto.fk_marca = parseInt(valor); 
    console.log(valor);
  }
  obtenercGenero(valor: string) {
    this.Producto.genero = valor;
    
    console.log(valor);
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

  agregarProducto(){
    this.Producto.pk_id_producto = (this.detalle)
    console.log(this.Producto);
    this.ConexProdcutoService.addProdcuto(this.Producto).subscribe();  
  }



}
