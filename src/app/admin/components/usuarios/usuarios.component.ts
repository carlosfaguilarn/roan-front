import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../../models/usuario.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
	public title: string;
	public usuarios : Array<Usuario>;
	public busqueda: string = '';
	public identity: Array<Usuario>;

	constructor(private userService: UserService) { 
		this.title = "Usuarios";
	  

		this.identity = userService.getIdentidad();
	}
	ngOnInit() {
		this.getUsers();
	}
	getUsers(){
		this.userService.getUsers().subscribe(
			response=>{
				if(!response.users){
					alert("No hay usuarios registrados");
				}else{
					this.usuarios = response.users;
				}
			},error =>{
				console.log("error al buscar los usuarios");
			}
		);
	}
}

