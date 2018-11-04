import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { GLOBAL } from "../../../services/global";
import { Usuario } from "../../../models/usuario.model"; 
import { Router } from "@angular/router";

declare var $:any;
@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  public url: string;
  public usuarios: Array<Usuario>;
  public identity: Array<Usuario>;
  public id_usuario: string = "1";
  public id_rol: string = "1";
  public id_rol_permiso: string = "1";
  public id_permiso: string = "";
  public id_rol_detalle: string = "1";
  public roles:any;
  public permisos: any;
  public permisos_detalle: any;
  constructor(private userService: UserService, private router: Router) { 
    this.url = GLOBAL.url;
    this.identity = userService.getIdentidad();
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles(); 
    this.getPermisos();
  }
  onSubmit(){
    let request: any = {
      "id_usuario": this.id_usuario,
      "id_rol": this.id_rol
    }
    console.log("Rol a asignar: ", request);

    this.userService.asignRolUser(request).subscribe(
      response => {
        if(!response.message){
          //this.status = 'error';
          alert("Hubo un error al asignar el rol");
        }else{
          alert("Se asignó el rol al usuario");
          this.getUsers();
        }
      },
      error => {
        var errorMessage = <any> error;
        if(errorMessage!=null){
          //this.status = 'error';
        }
      }
    );
  }
  onSubmitPermisos(){
    let request: any = {
      "id_rol": this.id_rol_permiso,
      "id_permiso": this.id_permiso
    }
    console.log("Permiso a asignar: ", request);

    this.userService.asignPermisionRole(request).subscribe(
      response => {
        if(!response.message){
          //this.status = 'error';
          alert("Hubo un error al asignar el permiso");
        }else{
          alert("Se asignó el permiso al rol");
        }
      },
      error => {
        var errorMessage = <any> error;
        if(errorMessage!=null){
          //this.status = 'error';
        }
      }
    );
  }
  getUsers(){
    this.userService.getUsers().subscribe(
      response => {
        if(!response.users){
          console.log("No hay usuarios");
        }else{
          this.usuarios = response.users;
          console.log("lista de usuarios: ", this.usuarios);
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }
  getRoles(){
    this.userService.getRoles().subscribe(
      response => {
        if(!response.roles){
          console.log("No hay roles");
        }else{
          this.roles = response.roles;
          console.log("lista de roles: ", this.roles);
        }
      },
      error => {
        let err = JSON.stringify(<any> error);
        console.log("errors", JSON.stringify(<any> error));
        if(err.indexOf('token_expired')){
          alert("El token de seguridad ha expirado, inicia sesión nuevamente por seguridad");
          this.router.navigate(['/adminlog']);
        }
      });
  }
  getPermisos(){
    this.userService.getPermisos().subscribe(
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

  getPermisosPorRol(rol: string){
		this.userService.getPermisosPorRol(rol).subscribe(
			response => {
				if(!response.permisos){
					console.log("No hay permisos");
				}else{
          return response.permisos;
				}
			},
			error => {
				let err = JSON.stringify(<any> error);
				console.log("errors", JSON.stringify(<any> error));        
			});
  } 

  verPermisos(){
    this.permisos_detalle = this.getPermisosPorRol(this.id_rol_detalle);
    console.log("Rol elegido: "+this.id_rol_detalle);
    console.log("lista de permisos por rol: ", this.permisos_detalle);
    alert(JSON.stringify(this.permisos_detalle));
    $('#detalleRol').modal('show');
  }

}
