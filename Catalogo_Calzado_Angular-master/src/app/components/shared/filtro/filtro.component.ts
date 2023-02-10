import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  ListaMarca:Marca[]=[];
  constructor(private ConexMarca:ConexMarcaService) { this.listarMarcas();}
  ngOnInit(): void {
    
  }
  listarMarcas()
  {
    console.log("Servicio ULTIMA NOVEDAD");
      this.ConexMarca.getMarcas().subscribe(
        (res: any) => {
          
          if (res.length === 0) {
            this.ListaMarca = [];
            console.log("No hay datos disponibles");
          } else {
            this.ListaMarca = res;
            console.log("Servicio ULTIMA AA");
          }
        },
        err => console.log(err)
      );
    } 
}
