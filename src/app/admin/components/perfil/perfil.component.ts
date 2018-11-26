import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "../../../services/global";
import { UserService } from "../../../services/user.service";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public url: string;
  public identity: any;

  constructor(private userService: UserService) { 
    this.url = GLOBAL.url;
    this.identity = userService.getIdentidad();
  }

  ngOnInit() {
    
  }
}
