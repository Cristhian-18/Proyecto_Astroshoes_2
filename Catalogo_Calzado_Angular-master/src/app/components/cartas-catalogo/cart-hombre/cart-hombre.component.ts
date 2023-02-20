import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService, Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-hombre',
  templateUrl: './cart-hombre.component.html',
  styleUrls: ['./cart-hombre.component.css']
})

export class CartHombreComponent implements OnInit {
  @Input() dataEntranteDetalle: any;
  p = 1;
  marcaId: number =1;
  tallas = Array.from({length: 45 - 20 + 1}, (_, i) => i + 20);
  tallaSeleccionada = this.tallas[0].toString();
  info_modal: boolean = false;
  ListaProducto: Producto[] = [];
  ListaHombre: Producto[] = [];
  Listatalla: Producto[] = [];
  ListaMarca: Marca[] = [];
  subcription: Subscription = new Subscription();

  
  constructor(private conexionProducto: ConexProductosService, private conexionMarca: ConexMarcaService) {
    this.listarMarcas();
    this.listarTalla();
  }

  /**
   * Una función que se utiliza para enumerar las marcas de un producto.
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

  ngOnInit() {
    this.listarProductos();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  /**
   * Toma un número de identificación, lo asigna a una variable y luego emite esa variable a otro
   * componente.
   * </código>
   * @param {number} id - número
   */
  getIDProducto(id: number) {
    this.dataEntranteDetalle = id;
    this.conexionProducto.disparadorDetalleProducto.emit(this.dataEntranteDetalle)
  }

  /**
   * Se suscribe a la función getProducto(), que devuelve un observable, y luego filtra los resultados
   * de ese observable y asigna los resultados filtrados a la variable ListaHombre.
   */
  listarProductos() {
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.ListaHombre = this.ListaProducto.filter(item => item.genero == 'Hombre')
        },
        err => console.log(err)
      )
    );
  }
  /**
   * Se suscribe al método getProducto() del servicio conexionProducto, y cuando recibe la respuesta,
   * asigna la respuesta a la variable ListaProducto, luego filtra la variable ListaProducto y asigna
   * el resultado a la variable Listatalla.
   */
  listarTalla() {
    this.subcription.add(
      this.conexionProducto.getProducto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.Listatalla= this.ListaProducto.filter(item => item.genero == 'Hombre')
        },
        err => console.log(err)
      )
    );
  }

  /**
   * Obtiene el valor seleccionado del menú desplegable y luego llama a una función para filtrar los
   * productos según el valor seleccionado.
   * @param {any} event - cualquier
   */
  getSelectedTalla(event: any) {
    const selectTalla = event.target as HTMLSelectElement;
    this.tallaSeleccionada = String(selectTalla.value);
    this.listarProductosFiltroTalla();
  }

  /**
   * Obtiene el valor de la opción seleccionada en el elemento seleccionado y lo asigna a la variable
   * marcaId.
   * @param {any} event - cualquier
   */
  getSelectedMarca(event: any) {
    const selectMarca = event.target as HTMLSelectElement;
    this.marcaId = Number(selectMarca.value);
    console.log(this.marcaId);
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
        this.ListaHombre = this.ListaProducto.filter(item => item.genero == 'Hombre' && item.talla === this.tallaSeleccionada )
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
        this.ListaHombre = this.ListaProducto.filter(item => item.genero == 'Hombre' && item.fk_marca === Number(this.marcaId) )
      },
      err => console.log(err)
    );
  }

  /**
   * Establece el valor de la variable info_modal en verdadero.
   */
  abrirmodal() {
    this.info_modal = true;
  }
}
