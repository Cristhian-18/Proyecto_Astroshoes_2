import { Component, OnInit,Input  } from '@angular/core';
import { ConexProductosService,Producto} from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() dataEntrante:any;
  @Input() dataEntrante2:any;

  ListaProducto:any=[];
  index:number=0;
  index2:number=0;
  constructor(private ConexProdcutoService:ConexProductosService) {
    this.listarProductos();
   }

  ngOnInit(): void {
    
  }
  
  listarProductos()
{
  console.log("Servicio PRODUCTOS TABLAS");
  this.ConexProdcutoService.getProdcuto().subscribe(
    res=>{
      
      console.log(res)
      this.ListaProducto=res;
      console.log("Servicio ULTIMA AA");
    },
    err => console.log(err)
    
  );
  
  }   
  eliminar(id:number){
    swal.fire({
      title: 'Seguro que quieres borrarlo?',
      text: "Seguro que quieres hacer esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.value) {
        this.ConexProdcutoService.deletproducto(id).subscribe(
          res => {
            swal.fire(
              'Eliminado!',
              'Se ha eliminado de tu lista de Producto.',
              'success'
            )
            this.listarProductos();
          },
          err => {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal al intetar eliminarlo!',
            })
          }
        )
      }
    })   
  }
  getNombres(id:number){
    this.dataEntrante = id;
    console.log("ID: ",id);
    this.ConexProdcutoService.disparadorDetalle.emit(this.dataEntrante)
  } 
  getIndex(id2:number){
    this.index=id2;
    this.dataEntrante2 = id2;
    console.log("ID: ",id2);
    this.ConexProdcutoService.disparadorDetalle.emit(this.dataEntrante2)
  }
  enviar(){
    
    for(let i=0;i<this.ListaProducto.length;i++){
      this.index2 = this.ListaProducto[i].pk_id_producto+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }
}
