import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})

export class NovedadesComponent implements OnInit {
  @Input() dataEntranteDetalle:any;
  p = 1;
  info_modal:boolean=false;
  ListaProducto:Producto[]=[];
  subcription: Subscription = new Subscription();

 /**
  * La función constructora es una función especial que se llama cuando se crea una nueva instancia de
  * la clase.
  * @param {ConexProductosService} conexionProducto - Este es el nombre del parámetro.
  */
  constructor(private conexionProducto:ConexProductosService) { }
  
  ngOnInit(){
    this.listarProductos();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  /**
   * Estoy tratando de enviar un número de un componente a otro.
   * </código>
   * @param {number} nombre - número
   */
  getIDProducto(nombre:number){
    this.dataEntranteDetalle = nombre;
    console.log(this.dataEntranteDetalle);
    this.conexionProducto.disparadorDetalleProducto.emit(this.dataEntranteDetalle)
  }

  /**
   * Estoy usando un servicio para obtener datos de una base de datos y luego estoy usando una
   * suscripción para obtener los datos del servicio y luego estoy usando una variable para almacenar
   * los datos de la suscripción
   */
  listarProductos()
  {
    console.log("---Servicio Novedades---");
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;     
        },
        err => console.log(err) 
      )
    );
  }

 /**
  * Establece el valor de la variable info_modal en verdadero.
  */
  abrirmodal(){
  this.info_modal = true;
  }
}