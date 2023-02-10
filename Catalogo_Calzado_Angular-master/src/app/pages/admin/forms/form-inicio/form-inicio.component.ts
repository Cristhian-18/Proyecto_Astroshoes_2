import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { categoria, ConexCategoriaService } from '../../../../services/conexiones/conex-categoria/conex-categoria.service';
import { ConexUsuariosService, Usuario } from '../../../../services/conexiones/conex-usuarios/conex-usuarios.service';
import { ConexProductosService } from '../../../../services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-form-inicio',
  templateUrl: './form-inicio.component.html',
  styleUrls: ['./form-inicio.component.css']
})
export class FormInicioComponent implements OnInit {
  
  ListaMarca:Marca[]=[];
  ListaCategoria:categoria[]=[];
  ListaProducto:Producto[]=[];
  ListaUsuario:Usuario[]=[];
  
  subcription: Subscription = new Subscription();
  sum_marc:number=0;
  sum_cat:number=0;
  sum_prod:number=0;
  sum_user:number=0;

  constructor(private ConexMarcaService:ConexMarcaService, private Conexcategoria:ConexCategoriaService,
    private ConexUsuarioService:ConexUsuariosService, private ConexProductoService:ConexProductosService ) { }

  ngOnInit(): void {
    this.listarMarcas();
    this.listarCategoria();
    this.listarProductos();
    this.listarUsuario();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
  }

  ////Listar las marcas para hacer el contador.////
  listarMarcas(){
    console.log("---Listar marcas----");
    this.subcription.add(
      this.ConexMarcaService.getMarcas().subscribe(
        res => {
          console.log(res)
          this.ListaMarca = <any> res;       
        },
          err => console.log(this.ListaMarca)
      )
    );
  }

  ////Listar las categorias para hacer el contador.////
  listarCategoria(){
    console.log("---Listar Categoria----");
    this.subcription.add(
      this.Conexcategoria.getCategoria().subscribe(
        res => {
          console.log(res)
          this.ListaCategoria = <any> res;
        },
        err => console.log(this.ListaCategoria)
      )
    );
  }   

  listarUsuario(){
    console.log("---Listar usuarios----");
    this.ConexUsuarioService.getUsuario().subscribe(
      res => {
        console.log(res)
        this.ListaUsuario = <any>res;
      },
        err => console.log(this.ListaUsuario)
    );   
  }

  listarProductos(){
    console.log("----Listar PRODUCTOS----");
    this.subcription.add(
      this.ConexProductoService.getProdcuto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto= <any> res;
        },
          err => console.log(err) 
      )
    );
  }

  ContadorCategoria(){
    this.sum_cat = this.ListaCategoria.length;
    return this.sum_cat;
  }

  ContadorMarcas(){
    this.sum_marc = this.ListaMarca.length;
    return this.sum_marc;
  }

  ContadorProductos(){
    this.sum_prod = this.ListaProducto.length;
    return this.sum_prod;
  }

  ContadorUsuarios(){
    this.sum_user = this.ListaUsuario.length;
    return this.sum_user;
  }
}
