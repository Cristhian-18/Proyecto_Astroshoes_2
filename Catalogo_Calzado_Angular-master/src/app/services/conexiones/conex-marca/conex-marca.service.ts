import { EventEmitter, Injectable, Output } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { API_URL } from '../../api';
import { Subject } from 'rxjs';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConexMarcaService {
  @Output() disparadorMODIFICARMARCA: EventEmitter<any> = new EventEmitter();
  private url=API_URL+'marca/';
  private _refresh$ = new Subject<void>();
  
  constructor(private http:HttpClient) { }

  //getMarcas
  getMarcas(){
    return this.http.get(this.url);
  };

 //get un Producto
  getUnmARCA(id_Marca:number){
    return this.http.get(this.url+id_Marca)
  };

  ///Agregar///
  addMarca(marca:Marca){
    return this.http.post(this.url,marca)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //Eliminar//
  deletemarca(id:number){
    return this.http.delete(this.url+id);
  };

  //Editar//
  editmarca(id:number, marca:Marca){
    return this.http.put(this.url+id,marca)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  };

  //Refrescar tablas//
  get refresh$(){
    return this._refresh$;
  }

}

console.log("Servicio en Uso MARCAS");
export interface Marca{
  id_Marca:number;
  nombre:string;
  descripcion:string;
};

