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

  constructor(private conexproduc:ConexProductosService, private ConexMarca: ConexMarcaService) { this.listarMarcas();}

  ngOnInit(){
    this.listarProductos();
    this.listarTalla();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getNombres(nombre:number){
    this.dataEntrante = nombre;
    console.log(this.dataEntrante);
    this.conexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

  listarProductos(){
    console.log("Servicio Carta Mujeres");
    this.subcription.add(
      this.conexproduc.getProdcuto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;
          this.ListaMujeres = this.ListaProducto.filter(item =>item.genero=='Mujer')       
        },
        err => console.log(err)
      )
    );
  }
  listarTalla() {
    this.subcription.add(
      this.conexproduc.getProdcuto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.Listatalla = this.ListaProducto.filter(item =>item.genero=='Mujer') 
           
        },
        err => console.log(err)
      )
    );
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

  abrirmodal(){
  this.info_modal = true;
  }

  getSelectedTalla(event: any) {
    const selectTalla = event.target as HTMLSelectElement;
    this.tallaSeleccionada = String(selectTalla.value);
    console.log(this.tallaSeleccionada);
    this.listarProductosFiltroTalla();
  }

  getSelectedMarca(event: any) {
    const selectMarca = event.target as HTMLSelectElement;
    this.marcaId = Number(selectMarca.value);
    this.listarProductosFiltroMarca();
  }

  listarProductosFiltroTalla() {
    this.conexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaMujeres = this.ListaProducto.filter(item => item.genero === 'Mujer' && item.talla === this.tallaSeleccionada)
      },
      err => console.log(err)
    );
  }

  listarProductosFiltroMarca() {
    this.conexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaMujeres = this.ListaProducto.filter(item => item.genero === 'Mujer' && item.fk_marca === Number(this.marcaId))
      },
      err => console.log(err)
    );
  }
}
