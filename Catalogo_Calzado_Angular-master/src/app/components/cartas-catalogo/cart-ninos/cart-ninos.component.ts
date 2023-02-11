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
  @Input() dataEntrante:any;
  ListaProducto:Producto[]=[];
  ListaNino:Producto[]=[];
  info_modal:boolean=false;
  ListaMarca: Marca[] = [];
  Listatalla: Producto[] = [];
  subcription: Subscription = new Subscription();

  constructor(private conexproduc:ConexProductosService, private ConexMarca: ConexMarcaService) { this.listarMarcas()}

  ngOnInit(): void {
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

  listarMarcas() {
    console.log("---Servicio Carta ninos---");
    this.subcription.add(
      this.ConexMarca.getMarcas().subscribe(
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
  listarTalla() {
    this.subcription.add(
      this.conexproduc.getProdcuto().subscribe(
        res => {
          this.ListaProducto = <any>res;
          this.Listatalla = this.ListaProducto.filter(item =>item.genero=='Niños')    
           
        },
        err => console.log(err)
      )
    );
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
        this.ListaNino = this.ListaProducto.filter(item => item.genero === 'Niños' && item.talla === this.tallaSeleccionada)
      },
      err => console.log(err)
    );
  }

  listarProductosFiltroMarca() {
    this.conexproduc.getProdcuto().subscribe(
      res => {
        console.log(res)
        this.ListaProducto = <any>res;
        this.ListaNino = this.ListaProducto.filter(item => item.genero === 'Niños' && item.fk_marca === Number(this.marcaId))
      },
      err => console.log(err)
    );
  }

  listarProductos()
  {
    this.subcription.add(
      this.conexproduc.getProdcuto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto=<any>res;
          this.ListaNino = this.ListaProducto.filter(item =>item.genero=='Niños')          
        },
        err => console.log(err)  
      )
    );
  }

  abrirmodal(){
  this.info_modal = true;
  }
}
