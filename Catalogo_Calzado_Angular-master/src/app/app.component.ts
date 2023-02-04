import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Catalogo_Calzado';

  public load: Boolean  = false;

  ngOnInit(): void{
    setTimeout(() => {
      this.load = true;
    }, 1000);
  }
}



