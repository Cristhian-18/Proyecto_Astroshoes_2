import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';

@Component({
  selector: 'app-cart-mujeres',
  templateUrl: './cart-mujeres.component.html',
  styleUrls: ['./cart-mujeres.component.css']
})
export class CartMujeresComponent implements OnInit {
  p = 1;
  tallas = Array.from({length: 45 - 20 + 1}, (_, i) => i + 20);
  tallaSeleccionada = this.tallas[0].toString();
  marcaId: number =1;
  @Input() dataEntrante:any;

  info_modal:boolean=false;

  ListaProducto:Producto[]=[];
  ListaMujeres:Producto[]=[];

  ListaMarca: Marca[] = [];

  constructor(private canexproduc:ConexProductosService, private ConexMarca: ConexMarcaService) { this.listarMarcas();}

  ngOnInit(){
   
    this.listarProductos();
  }

  getNombres(nombre:number){
    this.dataEntrante = nombre;
    console.log(this.dataEntrante);
    this.canexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

  listarProductos()
{
  console.log("Servicio ULTIMA NOVEDAD");
  this.canexproduc.getProdcuto().subscribe(
    res=>{
      console.log(res)
      this.ListaProducto=<any>res;
      this.ListaMujeres = this.ListaProducto.filter(item =>item.genero=='Mujer')   
           
    },
    err => console.log(err)
    
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
      this.ListaMujeres = this.ListaProducto.filter(item => item.genero === 'Mujer' && item.fk_marca === Number(this.marcaId) || item.talla === this.tallaSeleccionada)
    },
    err => console.log(err)
  );
}

}
