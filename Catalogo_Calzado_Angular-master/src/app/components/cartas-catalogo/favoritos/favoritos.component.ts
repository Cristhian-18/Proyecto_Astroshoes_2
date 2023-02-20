
import { ConexFavService } from 'src/app/services/conexiones/conex-fav/conex-fav.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  p = 1;
  allfavoritos: any = []; // Array para guardar los favoritos
  info_modal: boolean = false;
  subcription: Subscription = new Subscription();
 /**
  * La función constructora es una función especial que se llama cuando se crea una nueva instancia de
  * la clase.
  * @param {ConexFavService} conexionFavoritos - ConexFavServicio
  */
  constructor(private conexionFavoritos: ConexFavService) { }

  ngOnInit() {
    this.favoritos();
    /*
    this.subcription = this.conexFavService.refresh$.subscribe(()=>{
      this.favoritos();
    });    
    */
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado');
  }
  
  /**
   * Es una función que obtiene todos los favoritos de la base de datos y los coloca en una matriz.
   */
  favoritos(): void {
    this.subcription.add(
    this.conexionFavoritos
      .listarFavoritos()
      .subscribe((response: any) => {
        if (response.success) {
          this.allfavoritos = response.data;
        } else {
          Swal.fire('Error!', 'Hubo un problema al obtener los favoritos!', 'error');
        }
      },
        error => {
          Swal.fire('Error!', 'Hubo un problema al obtener los favoritos!', 'error');
        })
    );
  }

  /**
   * Establece el valor de la variable info_modal en verdadero.
   */
  abrirmodal() {
    this.info_modal = true;
  }

  /**
   * Estoy tratando de eliminar un favorito de una lista de favoritos.
   * </código>
   * @param {number} id - número
   */
  deleteFavorito(id: number) {
    Swal.fire({
      title: 'Seguro que quieres borrarlo?',
      text: "Seguro que quieres hacer esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.value) {
        this.conexionFavoritos.deletFavorito(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'Se ha eliminado de tu lista de favoritos.',
              'success'
            )
            this.favoritos();
          },
          err => {
            Swal.fire({
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
