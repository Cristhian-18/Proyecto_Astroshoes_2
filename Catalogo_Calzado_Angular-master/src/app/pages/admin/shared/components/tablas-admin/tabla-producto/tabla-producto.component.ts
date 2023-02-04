import { Component, OnInit,Input  } from '@angular/core';
import { ConexProductosService} from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexFavService } from 'src/app/services/conexiones/conex-fav/conex-fav.service';
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
  ListaFav:any=[];
  index:number=0;
  index2:number=0;
  constructor(private ConexProdcutoService:ConexProductosService,private ConexFavService:ConexFavService) {
    this.listarProductos();
    this.listarFav();
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
  listarFav()
  {
    console.log("Servicio FAVORITOS TABLAS");
    this.ConexFavService.getFavoritos().subscribe(
      res=>{
        console.log(res)
        this.ListaFav=res;
      
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
        for(let i=0;i<this.ListaFav.length;i++){
          if(this.ListaFav[i].fk_id_producto==id){
            console.log("Si existe!");
            this.ConexFavService.deletFavorito(this.ListaFav[i].id_favorito).subscribe(
              res => {
                console.log("Eliminado"); 
              }
            )
          }else{
            console.log("No existe!");
          }
        }
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
