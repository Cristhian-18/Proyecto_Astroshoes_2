import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  p = 2;
  @Input() dataEntrante:any;

  info_modal:boolean=false;

  ListaProducto:Producto[]=[];

  constructor(private canexproduc:ConexProductosService) { }

  ngOnInit(){
   
    this.listarProductos();
  }

  getNombres(nombre:number){
    this.dataEntrante = nombre;
    console.log(this.dataEntrante);
    this.canexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

  listarProductos(){
  this.canexproduc.getProdcuto().subscribe(
    res=>{
      this.ListaProducto=<any>res;       
    },
    err => console.log(err)
  );
}
  abrirmodal(){
  this.info_modal = true;
}
}