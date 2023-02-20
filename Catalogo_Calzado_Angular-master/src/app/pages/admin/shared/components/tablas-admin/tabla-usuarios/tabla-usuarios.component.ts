import { Component, OnInit } from '@angular/core';
import { ConexUsuariosService, Usuario  } from 'src/app/services/conexiones/conex-usuarios/conex-usuarios.service';
import { ConexFavService} from 'src/app/services/conexiones/conex-fav/conex-fav.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  p=1;
  ListaUsuario:Usuario[]=[];
  ListaFav:any=[];

  /**
   * La función constructora es una función predeterminada de la clase, que se llama cuando se crea una
   * instancia de la clase.
   * @param {ConexUsuariosService} ConexUsuarioService - Este es el servicio que se inyectará en el
   * componente.
   * @param {ConexFavService} ConexFavService - Este es el servicio que se utilizará para conectarse a
   * la base de datos.
   */
  constructor(private ConexUsuarioService:ConexUsuariosService, private ConexFavService:ConexFavService) { }

  /**
   * NgOnInit(): vacío {
   *     this.listarUsuario();
   *     esto.listarFav();
   *   }
   */
  ngOnInit(): void {
    this.listarUsuario();
    this.listarFavoritos();
  }

 /**
  * Estoy tratando de obtener los datos de la base de datos y mostrarlos en una tabla.
  */
  listarUsuario(){
    console.log("---Listar usuarios----");
    this.ConexUsuarioService.getUsuario().subscribe(
      res => {
        console.log(res)
        this.ListaUsuario = <any>res;
      },
        err => console.log(this.ListaUsuario)
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
        this.ListaFav=res;
      },
        err => console.log(err)
    );
  }  

  /**
   * Quiero eliminar un usuario y todos los favoritos asociados a ese usuario.
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
        for(let i=0;i<this.ListaFav.length;i++){
          if(this.ListaFav[i].fk_id_usuario==id){
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
        this.ConexUsuarioService.deleteUsuario(id).subscribe(
          res => {
            swal.fire(
              'Eliminado!',
              'Se ha eliminado de tu lista de Producto.',
              'success'
            )
            this.listarUsuario();
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
   * Si el término de búsqueda no está vacío, filtre la lista de usuarios por el término de búsqueda;
   * de lo contrario, enumere todos los usuarios.
   * @param {string} busca - cadena
   */
  filtrar(busca:string){
    if(busca!=''){
      this.ListaUsuario = this.ListaUsuario.filter(item =>item.nombres.includes(busca) || item.apellidos.includes(busca) || item.email.includes(busca))
    }else{
      this.listarUsuario()
    }
  }
}
