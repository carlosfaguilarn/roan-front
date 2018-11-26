import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'; 
import { UserService } from "./user.service";
import { identity } from 'rxjs';
import { Usuario } from "../models/usuario.model";



@Injectable()
export class HasPermisionGuard implements CanActivate{
    public identity: Array<Usuario>;
    public permisos: any;

    constructor(private router : Router,private userService: UserService){
        
    }

    canActivate(route: ActivatedRouteSnapshot): boolean{
        this.permisos = localStorage.getItem('permisos');

        const expectedPermission = route.data.expectedPermission;

        if(this.permisos.indexOf(expectedPermission) != -1){
            console.log("Bienvenido, cuentas con los permisos adecuado");
            return true;
        }
        alert("No cuentas con los permisos adecuados, necesitas el permiso["+expectedPermission+"], tus permisos son:"+this.permisos.split(","));

        //this.router.navigate(['/adminlog']);
        return false;
    }   
}