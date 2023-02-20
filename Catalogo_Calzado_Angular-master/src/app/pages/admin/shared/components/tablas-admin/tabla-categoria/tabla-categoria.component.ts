import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexCategoriaService,categoria} from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
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
  index2:number=0;
  p = 1;
  subcription: Subscription = new Subscription();

 /**
  * La función constructora es una función especial que se llama cuando se crea una nueva instancia de
  * la clase.
  * @param {ConexCategoriaService} Conexcategoria - Este es el nombre del servicio que desea inyectar.
  */
  constructor(private Conexcategoria:ConexCategoriaService) {
  }

  ngOnInit(): void {
    this.listarCategoria();
    this.subcription = this.Conexcategoria.refresh$.subscribe(()=>{
      this.listarCategoria();
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
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
    })  
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