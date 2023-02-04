import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {


  modal_admin:boolean  = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrirmodal(){
    this.modal_admin = true;
  }

}
