import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
@Component({
  selector: 'app-ninos',
  templateUrl: './ninos.component.html',
  styleUrls: ['./ninos.component.css']
})
export class NinosComponent implements OnInit {

  ListaMarca:Marca[]=[];

  constructor(private Conex:ConexMarcaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    console.log("Servicio ULTIMA NOVEDAD");
    this.Conex.getMarcas().subscribe(
      res=>{
        console.log(res)
        this.ListaMarca=<any>res;   
      },
      err => console.log(err)    
    );
  } 
}