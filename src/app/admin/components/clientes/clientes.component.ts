import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente.model";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public title: string;
	public clientes : Array<Cliente>;
	public busqueda: string = '';
	constructor() { 
		this.title = "Clientes";
	  this.clientes = [
      {id: '1', nombre:"Rosario", apellido:'Aguilar Santos', telefono:'6682341254', direccion:'América 2497, Las Cerezas, Los Mochis', email:"rosario.aguilar@gmail.com"},
      {id: '2', nombre:"Carlos Francisco", apellido:'Aguilar Navarrete', telefono:'6682124312', direccion:'Diente de León 1336, Las Cerezas, Los Mochis', email:"carlosf.aguilarn@gmail.com"}
    ];
	}
	ngOnInit() {
	}
}
