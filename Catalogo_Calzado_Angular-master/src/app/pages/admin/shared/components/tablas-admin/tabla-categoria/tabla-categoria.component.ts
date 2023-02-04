import { Component, OnInit, Input } from '@angular/core';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent implements OnInit {
  @Input() dataEntrante:any;
  @Input() dataEntrante2:any;
  index:number=0;
  ListaCategoria:any=[];
  index2:number=0;

  constructor(private Conexcategoria:ConexCategoriaService) {
     this.listarCategoria();
  }
   
  listarCategoria()
  {
    console.log("Servicio ULTIMA NOVEDAD");
    this.Conexcategoria.getCategoria().subscribe(
      res => {
        console.log(res)
        this.ListaCategoria = res;
      },
      err => console.log(this.ListaCategoria)
    );
    }   
  
  eliminar(id:string){
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
  
  getNombres(id:string){
    this.dataEntrante = id;
    console.log("ID: ",id);
    this.Conexcategoria.disparadorDetalle.emit(this.dataEntrante)
  } 
  getIndex(id2:number){
    this.index=id2;
    this.dataEntrante2 = id2;
    console.log("ID: ",id2);
    this.Conexcategoria.disparadorDetalle.emit(this.dataEntrante2)
  }
  enviar(){
    
    for(let i=0;i<this.ListaCategoria.length;i++){
      this.index2 = this.ListaCategoria[i].id_categoria+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }

  ngOnInit(): void {
  
  }

}