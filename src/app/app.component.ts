import { Component, DoCheck } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from "./models/usuario.model";
import { UserService } from "./services/user.service";
import { GLOBAL } from "./services/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'roan';
  public identity: Usuario;
  public url: string;
  public permisos: any;
  constructor(private _router: Router, private userService: UserService){
    this.identity = new Usuario('','','','','','','','');
    this.permisos = localStorage.getItem('permisos');
    this.url = GLOBAL.url;
  }

  logout(){
    localStorage.clear();
    this.identity = new Usuario('','','','','','','','');
    this._router.navigate(['/']);
  }
  ngDoCheck(){
    this.identity = this.userService.getIdentidad();
  }
}
