import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService, Producto,Genero } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  cargar:any=[];//CARGAR DATOS PARA MODIFICAR
  ListaMarca: Marca[]=[];//LISTA DE MARCAS
  ListaCateforias: categoria[]=[];//LISTA DE CATEGORIAS
  ListaGenero: Genero[]=[];//LISTA DE Genero
  LlenarcomboMarca:any=[];//LLenar Combobox de Marcas
  LlenarcomboCategorias:any=[];//LLenar Combobox de Categorias
  LlenarcomboGenero:any=[];//LLenar Combobox de Categorias
  aux:Producto[]=[];//auxiliar
  idm:number=0;//Index de Marcas
  idc:number=0;//Index de Categoria
  idg:string='';//Index de Genero
  modal_admin:boolean  = false;//bandera de Modal
  isChecked: boolean = false//bandera de oferta;
  id_entrada:number=0;//ID PARA EDITAR 
  subcription: Subscription = new Subscription();

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

  constructor(private ConexProductoService:ConexProductosService, private ConexMarca:ConexMarcaService,private ConexCategoria:ConexCategoriaService) {
    this.ListarCargaProducto();
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
  }

  ListarCargaProducto(){
    this.subcription.add(
      this.ConexProductoService.disparadorDetalle.subscribe(data=>{
        this.ConexProductoService.getUnProducto(data).subscribe(
        res=>{             
          this.cargar=res;  
          this.aux = <any>res;      
          for(let marca of this.aux) {          
            this.idm=marca.fk_marca;
            this.idc=marca.fk_id_categoria;
            this.idg=marca.genero;
            this.listarMarcas(this.idm);
            this.listarCategorias(this.idc);
            this.listarGenero(this.idg);
            if(marca.oferta=='Oferta'){
              this.isChecked = true;
            }
          }
        },
        err => console.log('Hola')
        );
      })
    );
  }

   //METODO PARA LLENAR EL COMBOBOX DE MARCAS PARA EL OBJETO A MODIFICAR
  listarMarcas(id:number){  
   this.ConexMarca.getMarcas().subscribe(
     res=>{    
       this.ListaMarca=<any>res;
       this.LlenarcomboMarca = this.ListaMarca.filter(item =>item.id_Marca == id)
       for (let i = 0; i < this.ListaMarca.length; i++) {
          if(this.ListaMarca[i].id_Marca !=id){
            this.LlenarcomboMarca.push(this.ListaMarca[i]);
          } 
        }      
     },
     err => console.log(err)  
   );
  } 

   //METODO PARA LLENAR EL COMBOBOX DE CATEGORIAS PARA EL OBJETO A MODIFICAR
  listarCategorias(id:number)
  { 
    this.ConexCategoria.getCategoria().subscribe(
      res=>{     
        this.ListaCateforias=<any>res;
        this.LlenarcomboCategorias = this.ListaCateforias.filter(item =>item.pk_id_categoria == id)
        for (let i = 0; i < this.ListaCateforias.length; i++) {
            if(this.ListaCateforias[i].pk_id_categoria !=id){
              this.LlenarcomboCategorias.push(this.ListaCateforias[i]);
            } 
          }      
      },
      err => console.log(err)  
    );
  } 
    
   //METODO PARA LLENAR EL COMBOBOX DE GENERO PARA EL OBJETO A MODIFICAR
  listarGenero(id:string){
  this.ListaGenero= this.ConexProductoService.getGenero();
  this.LlenarcomboGenero = this.ListaGenero.filter(item =>item.genero == id)
    for (let i = 0; i < this.ListaGenero.length; i++) {
      if(this.ListaGenero[i].genero !=id){
        this.LlenarcomboGenero.push(this.ListaGenero[i]);
      } 
    }     
  } 

  //OFERTA CHECK
  obtenerOferta(valor: boolean) {
    if(valor == true){
      this.isChecked = valor;
      console.log('Oferta');
    }else{
      this.isChecked = valor;
      console.log('No Oferta');
    }
  }

  obtenercategoria(valor: string) {
    this.Producto.fk_id_categoria= parseInt(valor); 
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

  modificar(ind:number,codigo_producto:string,img:string,nombre_producto:string,descripcion:string,fk_marca:number,modelo:string,genero:string,
    talla:string,costo:string,oferta:string,fk_id_categoria:number){
    //Extrae text//
    this.Producto.pk_id_producto = ind;
    this.Producto.codigo_producto =codigo_producto;
    this.Producto.img =img;
    this.Producto.nombre_producto =nombre_producto;
    this.Producto.descripcion =descripcion;
    if(this.Producto.fk_marca == 0){
      this.Producto.fk_marca = fk_marca;
    }
    this.Producto.modelo = modelo;
    if(this.Producto.genero == ''){
      this.Producto.genero =genero;
    }
   
    this.Producto.talla = talla;
    this.Producto.costo =costo;

    if(this.isChecked == true){
      this.Producto.oferta ='Oferta';
    }else{
      this.Producto.oferta ='No Oferta';
    }

    if(this.Producto.fk_id_categoria== 0){
      this.Producto.fk_id_categoria =fk_id_categoria;
    }
    console.log(this.Producto);      
    //Envia a la base de datos
    this.ConexProductoService.editproducto(this.Producto.pk_id_producto,this.Producto).subscribe(
       res=>{
         console.log(res);       
       },
       err=>console.log(err)
     ); 
  }
}
