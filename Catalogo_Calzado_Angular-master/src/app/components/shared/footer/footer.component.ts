import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  info_modal: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  abrirmodal() {
    this.info_modal = true;
  }

}
