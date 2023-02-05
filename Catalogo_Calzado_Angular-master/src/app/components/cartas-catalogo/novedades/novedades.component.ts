import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})

export class NovedadesComponent implements OnInit {
  @Input() dataEntrante:any;
  p = 1;
  info_modal:boolean=false;
  ListaProducto:Producto[]=[];
  subcription: Subscription = new Subscription();

  constructor(private conexproduc:ConexProductosService) { }
  
  ngOnInit(){
    this.listarProductos();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getNombres(nombre:number){
    this.dataEntrante = nombre;
    console.log(this.dataEntrante);
    this.conexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

  listarProductos()
  {
    console.log("---Servicio Novedades---");
    this.subcription.add(
      this.conexproduc.getProdcuto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;     
        },
        err => console.log(err) 
      )
    );
  }

  abrirmodal(){
  this.info_modal = true;
  }
}