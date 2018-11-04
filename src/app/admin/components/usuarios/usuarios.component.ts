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
	  /*this.usuarios = [
      {id: '1', nombre:"Rosario", apellido:'Aguilar Santos', telefono:'6682341254', direccion:'América 2497, Las Cerezas, Los Mochis', email:"rosario.aguilar@gmail.com", role:"ADMINISTRADOR"},
      {id: '2', nombre:"Carlos Francisco", apellido:'Aguilar Navarrete', telefono:'6682124312', direccion:'Diente de León 1336, Las Cerezas, Los Mochis', email:"carlosf.aguilarn@gmail.com", role:"CONTRATISTA"}
		];*/
		this.identity = userService.getIdentidad();
	}
	ngOnInit() {
	}
}

