import { Component, OnInit } from '@angular/core';
import { ConexUsuariosService } from 'src/app/services/conexiones/conex-usuarios/conex-usuarios.service';
import { ConexFavService } from 'src/app/services/conexiones/conex-fav/conex-fav.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  p=1;
  ListaUsuario:any=[];
  ListaFav:any=[];

  constructor(private ConexUsuarioService:ConexUsuariosService, private ConexFavService:ConexFavService) { }

  ngOnInit(): void {
    this.listarUsuario();
    this.listarFav();
  }

  listarUsuario(){
    console.log("---Listar usuarios----");
    this.ConexUsuarioService.getUsuario().subscribe(
      res => {
        console.log(res)
        this.ListaUsuario = res;
      },
        err => console.log(this.ListaUsuario)
    );   
  }

  listarFav(){
    console.log("Servicio obtener FAVORITOS");
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
}
