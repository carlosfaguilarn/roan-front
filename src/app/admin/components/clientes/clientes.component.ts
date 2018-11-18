import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente.model";
import { Router } from "@angular/router";
import { ClientService } from "../../../services/client.service";
import { Subscriber } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public title: string;
	public clientes : Array<Cliente>;
	public cliente : any;
	public editar_cliente : any;
	public busqueda: string = '';
	constructor(private clientService: ClientService, private router: Router) { 
		this.title = "Clientes";  
		this.cliente = {
			name: '',direccion:'', telefono:'', email:''
		}
		this.editar_cliente = {
		  name: '',direccion:'', telefono:'', email:''
		}
	}
	ngOnInit() {
		this.getClients();
	}
	nuevoCliente(){
      this.clientService.newClient(this.cliente).subscribe(
      response => {
        if(!response.message){
					alert('Error al agregar el cliente');
        }else{
					console.log(response);
          alert(response.message);
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
	editarCliente(id:string){
		console.log(this.editar_cliente);
		this.clientService.editClient(this.editar_cliente, id).subscribe(
      response => {
        if(!response.message){
					alert('Error al editar el cliente');
        }else{
					console.log(response);
          alert(response.message);
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
	getClients(){
		this.clientService.getClients().subscribe(
		  response => {
			if(!response.clients){
				console.log("No hay clientes");
			}else{
				this.clientes = response.clients
				console.log(response);
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
}
