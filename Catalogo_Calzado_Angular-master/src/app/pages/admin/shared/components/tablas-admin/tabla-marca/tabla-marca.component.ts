import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexMarcaService, Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService,Producto,} from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexFavService,Favoritos } from 'src/app/services/conexiones/conex-fav/conex-fav.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-marca',
  templateUrl: './tabla-marca.component.html',
  styleUrls: ['./tabla-marca.component.css']
})
export class TablaMarcaComponent implements OnInit {

  @Input() dataEntranteModificar:any;
  @Input() dataEntranteInsertar:any;
  subcription: Subscription = new Subscription();
  ListaMarca:Marca[]=[];
  ListaProducto:Producto[]=[];
  ListaFav:Favoritos[]=[];
  p = 1;
  index:number=0;
  index2:number=0;

  constructor(private ConexMarcaService:ConexMarcaService,private ConexProductoService:ConexProductosService,private ConexFavService:ConexFavService) { }
  
  ngOnInit(): void { 
    this.listarMarcas();
    this.listarFavoritos();
    this.listarProductos();
    this.subcription = this.ConexMarcaService.refresh$.subscribe(()=>{
      this.listarMarcas();
      this.listarFavoritos();
      this.listarProductos();
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
  }

  /**
   * Es una función que obtiene una lista de marcas de un servicio y la asigna a una variable.
   * </código>
   */
  listarMarcas(){
    console.log("---Listar marcas----");
    this.subcription.add(
      this.ConexMarcaService.getMarcas().subscribe(
        res => {
          console.log(res)
          this.ListaMarca = <any> res;
          
        },
          err => console.log(this.ListaMarca)
      )
    );
  }

  /**
   * "Esta función se llama cuando se carga la página y llama a la función getFavoritos() en el
   * servicio ConexFavService, que devuelve una lista de favoritos de la base de datos, que luego se
   * almacena en la variable ListaFav".
   * </código>
   */
  listarFavoritos(){
    console.log("Servicio obtener FAVORITOS");
    this.ConexFavService.getFavoritos().subscribe(
      res=>{
        console.log(res)
        this.ListaFav=  <any> res;
      },
        err => console.log(err)
    );
  }  

  /**
   * Es una función que obtiene una lista de productos de una base de datos y los muestra en una tabla.
   */
  listarProductos(){
    console.log("----Listar PRODUCTOS----");
    this.subcription.add(
      this.ConexProductoService.getProducto().subscribe(
        res=>{
          console.log(res)
          this.ListaProducto= <any> res;
        },
          err => console.log(err) 
      )
    );
  }



  /**
   * Elimina una marca de la base de datos.
   * @param {number} id - número
   */
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
        for(let i=0;i<this.ListaProducto.length;i++){
          if(this.ListaProducto[i].fk_marca==id){
            console.log("Si existe en Producto!");
            for(let j=0;j<this.ListaFav.length;j++){
              if(this.ListaFav[j].fk_id_producto==this.ListaProducto[i].pk_id_producto){
                console.log("Si existe en Favoritos!");
                this.ConexFavService.deletFavorito(this.ListaFav[j].id_favorito).subscribe(
                  res => {
                    console.log("Eliminado de la lista Favoritos"); 
                  }
                )
              }else{
                console.log("No existe en lista de Favoritos!");
                this.ConexProductoService.deletProducto(this.ListaProducto[i].pk_id_producto).subscribe(
                  res => {
                    console.log("Eliminado de la lista Productos"); 
                  }
                )
              }
            }
            this.ConexProductoService.deletProducto(this.ListaProducto[i].pk_id_producto).subscribe(
              res => {
                console.log("Eliminado de la lista Productos"); 
              }
            )
          }else{
            console.log("No existe en la lista de productos!");
          }
        }
        
         for(let i=0;i<this.ListaProducto.length;i++){
          if(this.ListaProducto[i].fk_marca==id){
            
            this.ConexProductoService.deletProducto(this.ListaProducto[i].pk_id_producto).subscribe(
              res => {
                console.log("Eliminado de la lista Productos"); 
              }
              
            )
            this.eliminarM(id);
          }else{
            console.log("No existe en la lista de productos!");
          }
        }        
      }
    })  
  }


  eliminarM(id:number){
    this.ConexMarcaService.deleteMarca(id).subscribe(
      res => {
        swal.fire(
          'Eliminado!',
          'Se ha eliminado de tu lista de Marcas.',
          'success'
        )
        this.listarMarcas();
      },
      err => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal al intetar eliminarlo',
        })
      }
    )
  }


/**
 * Toma una identificación, la asigna a una variable, emite la variable y registra la identificación.
 * @param {number} id - número
 */
  getIDMarca(id:number){
    this.dataEntranteModificar = id;
    console.log("ID: ",id);
    this.ConexMarcaService.disparadorMarca.emit(this.dataEntranteModificar)
  } 

 /**
  * "Cuando el usuario hace clic en un botón, se llama a la función getIndex(), que envía el índice del
  * botón al servicio, que luego lo envía al componente que lo necesita".
  * </código>
  * @param {number} id2 - número
  */
  getIndex(id2:number){
    this.index=id2;
    this.dataEntranteInsertar = id2;
    console.log("ID: ",id2);
    this.ConexMarcaService.disparadorMarca.emit(this.dataEntranteInsertar)
  }

  /**
   * Recorre la matriz y luego asigna el valor del último elemento de la matriz a la variable index2.
   */
  enviar(){
    for(let i=0;i<this.ListaMarca.length;i++){
      this.index2 = this.ListaMarca[i].id_Marca+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }

  /**
   * Si el término de búsqueda no está vacío, filtre la lista de elementos solo a aquellos que
   * contienen el término de búsqueda. De lo contrario, muestra la lista completa.
   * @param {string} busca - cadena
   */
  filtrar(busca:string){
    if(busca!=''){
      this.ListaMarca = this.ListaMarca.filter(item =>item.nombre.includes(busca))
    }else{
      this.listarMarcas();
    }
  }
}
