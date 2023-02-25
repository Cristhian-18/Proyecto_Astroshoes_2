import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexCategoriaService,categoria} from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import { ConexProductosService,Producto,} from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexFavService,Favoritos } from 'src/app/services/conexiones/conex-fav/conex-fav.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent implements OnInit {
  @Input() dataEntranteModificar:any;
  @Input() dataEntranteInsertar:any;
  index:number=0;
  ListaCategoria:categoria[]=[];
  ListaProducto:Producto[]=[];
  ListaFav:Favoritos[]=[];
  index2:number=0;
  p = 1;
  subcription: Subscription = new Subscription();

 /**
  * La función constructora es una función especial que se llama cuando se crea una nueva instancia de
  * la clase.
  * @param {ConexCategoriaService} Conexcategoria - Este es el nombre del servicio que desea inyectar.
  */
  constructor(private Conexcategoria:ConexCategoriaService,private ConexProductoService:ConexProductosService,private ConexFavService:ConexFavService) {
  }

  ngOnInit(): void {
    this.listarCategoria();
    this.listarFavoritos();
    this.listarProductos();
    this.subcription = this.Conexcategoria.refresh$.subscribe(()=>{
      this.listarCategoria();
      this.listarFavoritos();
      this.listarProductos();
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
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
   * Es una función que llama a un servicio que devuelve un observable, al que luego se suscribe y el
   * resultado se asigna a una variable.
   */
  listarCategoria(){
    console.log("---Listar Categoria----");
    this.subcription.add(
      this.Conexcategoria.getCategoria().subscribe(
        res => {
          console.log(res)
          this.ListaCategoria = <any> res;
        },
        err => console.log(this.ListaCategoria)
      )
    );
  }   
  
  /**
   * Elimina una categoria de la base de datos.
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
          if(this.ListaProducto[i].fk_id_categoria==id){
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
          if(this.ListaProducto[i].fk_id_categoria==id){
            
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
      
    this.Conexcategoria.deleteCategoria(id).subscribe(
      res => {
        swal.fire(
          'Eliminado!',
          'Se ha eliminado de tu lista de Categorias.',
          'success'
        )
        this.listarCategoria();
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
 /**
  * "Cuando el usuario hace clic en una categoría, la identificación de la categoría se envía al
  * servicio y luego el servicio envía la identificación al componente que muestra los productos".
  * </código>
  * @param {number} id - número
  */
  getIDCategoria(id:number){
    this.dataEntranteModificar = id;
    console.log("ID: ",id);
    this.Conexcategoria.disparadorCategoria.emit(this.dataEntranteModificar)
  } 

  /**
   * "Cuando el usuario hace clic en un botón, se llama a la función getIndex(), que emite el índice
   * del botón en el que se hizo clic en el componente principal".
   * </código>
   * @param {number} id2 - número
   */
  getIndex(id2:number){
    this.index=id2;
    this.dataEntranteInsertar = id2;
    console.log("ID: ",id2);
    this.Conexcategoria.disparadorCategoria.emit(this.dataEntranteInsertar)
  }

  /**
   * Recorre la matriz y luego asigna el valor del último elemento de la matriz a la variable index2.
   */
  enviar(){
    for(let i=0;i<this.ListaCategoria.length;i++){
      this.index2 = this.ListaCategoria[i].pk_id_categoria+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }

  /**
   * Si el término de búsqueda no está vacío, filtre la lista de categorías por el término de búsqueda;
   * de lo contrario, enumere todas las categorías.
   * @param {string} busca - cadena
   */
  filtrar(busca:string){
    if(busca!=''){
      this.ListaCategoria = this.ListaCategoria.filter(item =>item.nombre_cat.includes(busca))
    }else{
      this.listarCategoria();
    }
  }


}