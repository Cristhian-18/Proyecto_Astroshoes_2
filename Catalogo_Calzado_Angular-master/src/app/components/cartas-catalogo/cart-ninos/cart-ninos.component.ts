import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-ninos',
  templateUrl: './cart-ninos.component.html',
  styleUrls: ['./cart-ninos.component.css']
})
export class CartNinosComponent implements OnInit {
  p = 1;
  tallas = Array.from({length: 45 - 20 + 1}, (_, i) => i + 20);
  tallaSeleccionada = this.tallas[0].toString();
  marcaId: number =1;
  @Input() dataEntranteDetalle:any;
  ListaProducto:Producto[]=[];
  ListaNino:Producto[]=[];
  info_modal:boolean=false;
  ListaMarca: Marca[] = [];
  Listatalla: Producto[] = [];
  subcription: Subscription = new Subscription();

  /**
   * Esta función se llama cuando se crea el componente y llama a la función listarMarcas().
   * @param {ConexProductosService} conexionProducto - ConexProductosServicio
   * @param {ConexMarcaService} conexionMarca - ConexMarcaServicio
   */
  constructor(private conexionProducto:ConexProductosService, private conexionMarca: ConexMarcaService) { this.listarMarcas()}

  ngOnInit(): void {
    this.listarProductos();
    this.listarTalla();
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
   * Se suscribe a la función getMarcas(), que devuelve un observable, y luego asigna el resultado de
   * ese observable a la variable ListaMarca.
   */
  listarMarcas() {
    console.log("---Servicio Carta ninos---");
    this.subcription.add(
      this.conexionMarca.getMarcas().subscribe(
        (res: any) => { 
          if (res.length === 0) {
            this.ListaMarca = [];
          } else {
            this.ListaMarca = res;
          }
        },
        err => console.log(err)
      )
    );
  }
  /**
   * Toma una lista de productos, la filtra para incluir solo productos para niños y luego asigna el
   * resultado a una variable llamada Listatalla.
   */
  listarTalla() {
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.Listatalla = this.ListaProducto.filter(item =>item.genero=='Niños')    
           
        },
        err => console.log(err)
      )
    );
  }


  /**
   * Toma el valor de la opción seleccionada del desplegable y se lo asigna a la variable
   * tallaSeleccionada.
   * @param {any} event - cualquier
   */
  getSelectedTalla(event: any) {
    const selectTalla = event.target as HTMLSelectElement;
    this.tallaSeleccionada = String(selectTalla.value);
    console.log(this.tallaSeleccionada);
    this.listarProductosFiltroTalla();
  }
  
  /**
   * Obtiene el valor seleccionado del desplegable y lo asigna a la variable marcaId.
   * @param {any} event - cualquier
   */
  getSelectedMarca(event: any) {
    const selectMarca = event.target as HTMLSelectElement;
    this.marcaId = Number(selectMarca.value);
    this.listarProductosFiltroMarca();
  }
  
  /**
   * Es una función que obtiene una lista de productos de una base de datos, los filtra por género y
   * tamaño y luego los muestra en una lista.
   */
  listarProductosFiltroTalla() {
    this.conexionProducto.getProducto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaNino = this.ListaProducto.filter(item => item.genero === 'Niños' && item.talla === this.tallaSeleccionada)
      },
      err => console.log(err)
    );
  }

  /**
   * Es una función que obtiene una lista de productos de una base de datos, los filtra por género y
   * marca y luego los muestra en la página.
   */
  listarProductosFiltroMarca() {
    this.conexionProducto.getProducto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaNino = this.ListaProducto.filter(item => item.genero === 'Niños' && item.fk_marca === Number(this.marcaId))
      },
      err => console.log(err)
    );
  }

  /**
   * Estoy usando un servicio para obtener una lista de productos de una base de datos, luego estoy
   * filtrando la lista para obtener solo los productos que tienen el género "Niños" y luego estoy
   * asignando la lista filtrada a una variable llamada ListaNino
   */
  listarProductos()
  {
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;
          this.ListaNino = this.ListaProducto.filter(item =>item.genero=='Niños')          
        },
        err => console.log(err)  
      )
    );
  }

  /**
   * Abre un modal.
   */
  abrirmodal(){
  this.info_modal = true;
  }
}
