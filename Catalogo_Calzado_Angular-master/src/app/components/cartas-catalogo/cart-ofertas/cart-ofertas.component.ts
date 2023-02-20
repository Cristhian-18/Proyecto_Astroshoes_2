import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-cart-ofertas',
  templateUrl: './cart-ofertas.component.html',
  styleUrls: ['./cart-ofertas.component.css']
})
export class CartOfertasComponent implements OnInit {
  @Input() dataEntranteDetalle:any;
  p = 1;
  info_modal:boolean=false;
  ListaProducto:Producto[]=[];
  Listaofertas:Producto[]=[];
  subcription: Subscription = new Subscription();

  /**
   * El constructor es una función que se llama cuando se crea una nueva instancia de una clase
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
   * Estoy usando un servicio para obtener una lista de productos de una base de datos, luego estoy
   * filtrando la lista para obtener solo los productos que están en oferta
   */
  listarProductos()
  {
    console.log("---Servicio Novedades---");
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;  
          this.Listaofertas = this.ListaProducto.filter(item =>item.oferta=='Oferta')     
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
