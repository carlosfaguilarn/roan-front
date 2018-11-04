import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'; 
import { UserService } from "./user.service";
import { identity } from '../../../node_modules/rxjs';
import { Usuario } from "../models/usuario.model";



@Injectable()
export class HasPermisionGuard implements CanActivate{
    public identity: Array<Usuario>;
    public permisos;
    constructor(
        private _router : Router,
        private userService: UserService
    ){
        this.getPermisosPorRol();
    }

    canActivate(){
        var token = this.userService.getToken();
        if(this.permisos.indexOf("view_proyects")){
            return true;
        }
        this._router.navigate(['/adminlog']);
        return false;
    }   
    getPermisosPorRol(){
        this.userService.getPermisosPorRol(this.identity[0].id_rol).subscribe(
          response => {
            if(!response.permisos){
              console.log("No hay permisos");
            }else{
              this.permisos = response.permisos;
              console.log("lista de permisos: ", this.permisos);
            }
          },
          error => {
            let err = JSON.stringify(<any> error);
            console.log("errors", JSON.stringify(<any> error));        
          });
      }
}