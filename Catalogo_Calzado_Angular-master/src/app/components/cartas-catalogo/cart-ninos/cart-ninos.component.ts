import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';

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
  @Input() dataEntrante:any;
  ListaProducto:Producto[]=[];
  ListaNino:Producto[]=[];

  info_modal:boolean=false;
  ListaMarca: Marca[] = [];

  constructor(private canexproduc:ConexProductosService, private ConexMarca: ConexMarcaService) { this.listarMarcas()}

  ngOnInit(): void {
    this.listarProductos();
  }
  
  getNombres(nombre:number){
    this.dataEntrante = nombre;
    console.log(this.dataEntrante);
    this.canexproduc.disparadorDetalle.emit(this.dataEntrante)
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
  getSelectedTalla(event: any) {
    const selectTalla = event.target as HTMLSelectElement;
    this.tallaSeleccionada = String(selectTalla.value);
    console.log(this.tallaSeleccionada);
    this.listarProductosFiltro();
  }
  
  getSelectedMarca(event: any) {
    const selectMarca = event.target as HTMLSelectElement;
    this.marcaId = Number(selectMarca.value);
    this.listarProductosFiltro();
  }
  
  listarProductosFiltro() {
    this.canexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaNino = this.ListaProducto.filter(item => item.genero === 'Niños' && item.fk_marca === Number(this.marcaId) || item.talla === this.tallaSeleccionada)
      },
      err => console.log(err)
    );
  }
  listarProductos()
  {
    console.log("Servicio ULTIMA NOVEDAD");
    this.canexproduc.getProdcuto().subscribe(
      res=>{
        console.log(res)
        this.ListaProducto=<any>res;
        this.ListaNino = this.ListaProducto.filter(item =>item.genero=='Niños')          
      },
      err => console.log(err)
      
    );
  }
  abrirmodal(){
  this.info_modal = true;
  }

}
