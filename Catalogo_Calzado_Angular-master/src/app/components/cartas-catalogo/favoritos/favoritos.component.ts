
import { ConexFavService } from 'src/app/services/conexiones/conex-fav/conex-fav.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  p = 1;
  allfavoritos: any = []; // Array para guardar los favoritos
  info_modal: boolean = false;

  constructor(private conexFavService: ConexFavService) {

  }

  ngOnInit() {
    this.favoritos();
  }

  favoritos(): void {
    this.conexFavService
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
        });
  }

  abrirmodal() {
    this.info_modal = true;
  }

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
        this.conexFavService.deletFavorito(id).subscribe(
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
