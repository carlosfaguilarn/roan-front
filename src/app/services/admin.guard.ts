import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'; 
import { UserService } from "./user.service";

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(
        private _router : Router,
        private userService: UserService
    ){}

    canActivate(){
        var identity = this.userService.getIdentidad();
        var token = this.userService.getToken();

        console.log("Mi identidad", identity);
        
        if(identity.role == 'ADMINISTRADOR' || identity.role == 'STANDARD' ){
            console.log("Puedes continuar usando el sistema");
            return true;
        }else{
            console.log("Debes loggearte para continuar");
            this._router.navigate(['/adminlog']);
            return false;
        }
    }   
}