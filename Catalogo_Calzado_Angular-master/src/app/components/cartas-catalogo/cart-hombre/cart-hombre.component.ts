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
  @Input() dataEntrante: any;
  p = 1;
  marcaId: number =1;
  tallas = Array.from({length: 45 - 20 + 1}, (_, i) => i + 20);
  tallaSeleccionada = this.tallas[0].toString();
  info_modal: boolean = false;
  ListaProducto: Producto[] = [];
  ListaHombre: Producto[] = [];
  ListaMarca: Marca[] = [];
  subcription: Subscription = new Subscription();

  
  constructor(private conexproduc: ConexProductosService, private ConexMarca: ConexMarcaService) {
    this.listarMarcas();
  }

  listarMarcas() {
    this.ConexMarca.getMarcas().subscribe(
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

  getNombres(nombre: number) {
    this.dataEntrante = nombre;
    this.conexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

  listarProductos() {
    this.subcription.add(
      this.conexproduc.getProdcuto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.ListaHombre = this.ListaProducto.filter(item => item.genero == 'Hombre')
        },
        err => console.log(err)
      )
    );
  }

  getSelectedTalla(event: any) {
    const selectTalla = event.target as HTMLSelectElement;
    this.tallaSeleccionada = String(selectTalla.value);
    this.listarProductosFiltroTalla();
  }

  getSelectedMarca(event: any) {
    const selectMarca = event.target as HTMLSelectElement;
    this.marcaId = Number(selectMarca.value);
    console.log(this.marcaId);
    this.listarProductosFiltroMarca();
  }

  listarProductosFiltroTalla() {
    this.conexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaHombre = this.ListaProducto.filter(item => item.genero == 'Hombre' && item.talla === this.tallaSeleccionada )
      },
      err => console.log(err)
    );
  }

  listarProductosFiltroMarca() {
    this.conexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaHombre = this.ListaProducto.filter(item => item.genero == 'Hombre' && item.fk_marca === Number(this.marcaId) )
      },
      err => console.log(err)
    );
  }

  abrirmodal() {
    this.info_modal = true;
  }
}
