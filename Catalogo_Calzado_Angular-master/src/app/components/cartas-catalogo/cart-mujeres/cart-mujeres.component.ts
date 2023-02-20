import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-mujeres',
  templateUrl: './cart-mujeres.component.html',
  styleUrls: ['./cart-mujeres.component.css']
})
export class CartMujeresComponent implements OnInit {
  @Input() dataEntrante:any;
  p = 1;
  tallas = Array.from({length: 45 - 20 + 1}, (_, i) => i + 20);
  tallaSeleccionada = this.tallas[0].toString();
  marcaId: number =1;
  info_modal:boolean=false;
  ListaProducto:Producto[]=[];
  ListaMujeres:Producto[]=[];
  ListaMarca: Marca[] = [];
  Listatalla: Producto[] = [];
  subcription: Subscription = new Subscription();

  /**
   * Esta función se llama cuando se crea el componente y llama a la función listarMarcas().
   * @param {ConexProductosService} conexionProducto - ConexProductosServicio
   * @param {ConexMarcaService} conexionMarca - ConexMarcaServicio
   */
  constructor(private conexionProducto:ConexProductosService, private conexionMarca: ConexMarcaService) { this.listarMarcas();}

  ngOnInit(){
    this.listarProductos();
    this.listarTalla();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

 /**
  * "Obtengo la identificación del producto y la envío al otro componente"
  * </código>
  * @param {number} id - número
  */
  getIDProducto(id:number){
    this.dataEntrante = id;
    console.log(this.dataEntrante);
    this.conexionProducto.disparadorDetalleProducto.emit(this.dataEntrante)
  }

  /**
   * Estoy tratando de filtrar los datos de la API y mostrarlos en la vista.
   */
  listarProductos(){
    console.log("Servicio Carta Mujeres");
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;
          this.ListaMujeres = this.ListaProducto.filter(item =>item.genero=='Mujer')       
        },
        err => console.log(err)
      )
    );
  }

  /**
   * Toma una matriz de objetos, la filtra según una condición y devuelve una nueva matriz de objetos.
   */
  listarTalla() {
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.Listatalla = this.ListaProducto.filter(item =>item.genero=='Mujer') 
           
        },
        err => console.log(err)
      )
    );
  }

  /**
   * Es una función que llama a un servicio que realiza una solicitud a una API y devuelve una lista de
   * objetos.
   */
  listarMarcas() {
    this.conexionMarca.getMarcas().subscribe(
      (res: any) => {
        if (res.length === 0) {
          this.ListaMarca = [];
        } else {
          this.ListaMarca = res;
        }
      },
      err => console.log(err)
    );
  }

  /**
   * Abre un modal.
   */
  abrirmodal(){
  this.info_modal = true;
  }

 /**
  * Toma el valor de la opción seleccionada en el desplegable y se lo asigna a la variable
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
   * tamaño y luego los muestra en la página.
   */
  listarProductosFiltroTalla() {
    this.conexionProducto.getProducto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaMujeres = this.ListaProducto.filter(item => item.genero === 'Mujer' && item.talla === this.tallaSeleccionada)
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
        this.ListaMujeres = this.ListaProducto.filter(item => item.genero === 'Mujer' && item.fk_marca === Number(this.marcaId))
      },
      err => console.log(err)
    );
  }
}
