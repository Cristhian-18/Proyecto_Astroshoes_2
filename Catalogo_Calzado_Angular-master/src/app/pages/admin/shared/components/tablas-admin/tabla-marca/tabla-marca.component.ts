import { Component, OnInit, Input } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-marca',
  templateUrl: './tabla-marca.component.html',
  styleUrls: ['./tabla-marca.component.css']
})
export class TablaMarcaComponent implements OnInit {

  @Input() dataEntrante:any;
  @Input() dataEntrante2:any;
  ListaMarca:any=[];
  index:number=0;
  index2:number=0;

  constructor(private ConexProdcutoService:ConexMarcaService) { this.listarMarcas();}
  ngOnInit(): void {
    
  }
  listarMarcas()
  {
    console.log("Servicio ULTIMA NOVEDAD");
      this.ConexProdcutoService.getMarcas().subscribe(
   
          res => {
            console.log(res)
            this.ListaMarca = res;
          },
          err => console.log(this.ListaMarca)
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
        this.ConexProdcutoService.deletemarca(id).subscribe(
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
    this.ConexProdcutoService.disparadorMODIFICARMARCA.emit(this.dataEntrante)
  } 
  getIndex(id2:number){
    this.index=id2;
    this.dataEntrante2 = id2;
    console.log("ID: ",id2);
    this.ConexProdcutoService.disparadorMODIFICARMARCA.emit(this.dataEntrante2)
  }
  enviar(){
    
    for(let i=0;i<this.ListaMarca.length;i++){
      this.index2 = this.ListaMarca[i].id_Marca+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }
}
