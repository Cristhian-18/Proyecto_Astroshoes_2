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
  detalle:any={};
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
    this.ConexProductoService.addProdcuto(this.Producto).subscribe();  
    this.Limpiar(); 
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
