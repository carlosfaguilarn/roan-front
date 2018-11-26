import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router"; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: Usuario;
  public identity: any;
  public token: any;
  public status: any;
  public permisos: any[];
  constructor(
    private _userService: UserService,
    private _router: Router
  ){ 
    this.user = new Usuario('', '', '', '','','','','');
  }

  ngOnInit() {
  }

  getPermissions(rol: string){
      this._userService.getPermisosPorRol(rol).subscribe(
          response=>{
              if(!response.permisos){
                  alert("Hubo un error al ver los permisos");
              }else{
                  this.permisos = response.permisos;
                  localStorage.setItem('permisos', this.permisos.toString());
              }
          },error=>{
              var errorMessage = <any> error;
              if(errorMessage != null) alert(errorMessage);
          }
      );
  }

  onSubmit(){
    // Loguear al usuario y conseguir sus datos
    this._userService.signup(this.user).subscribe(
        response => {
            this.identity = response.user;
            console.log(this.identity);
            if(!this.identity){
                alert('El usuario no se ha logueado correctamente');
            }else{
                // Guardar al user en el local storage
                localStorage.setItem('identity', JSON.stringify(this.identity));
                // Conseguir el token
                this.token = response.token;
                console.log(this.token);
                if(this.token.lenght <= 0){
                    alert('El token no se ha generado');
                }else{
                    // Guardar el token en local storage
                    localStorage.setItem('token', this.token);
                    this.status = 'success';
                    
                    this._userService.getPermisosPorRol(this.identity.id_rol).subscribe(
                        response=>{
                            if(!response.permisos){
                                alert("Hubo un error al ver los permisos");
                            }else{
                                this.permisos = response.permisos;
                                localStorage.setItem('permisos', this.permisos.toString());
                                this._router.navigate(['/admin/perfil']);
                            }
                        },error=>{
                            var errorMessage = <any> error;
                            if(errorMessage != null) alert(errorMessage);
                        }
                    );
                }
            }
        },
        error => {
            var errorMessage = <any> error;
            if(errorMessage != null){ 
                alert(errorMessage);
                this.status = 'error';
            }
        }
    );
}
}
