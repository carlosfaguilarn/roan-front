import { Component, OnInit } from '@angular/core';
//Modelos
import { Proyecto } from "../../../models/proyecto.model";
import { Concepto } from "../../../models/conceptos.model";
import { Usuario } from "../../../models/usuario.model";
import { Cliente } from "../../../models/cliente.model";
import { Router } from "@angular/router";
import { Presupuesto } from "../../../models/presupuesto.model";
//import { Cliente } from "../../../models/cliente.model";

//Compontentes
import { ChartPieComponent } from "../charts/chart-pie/chart-pie.component";
import { UserService } from "../../../services/user.service";

//Servicios
import { ProjectService } from "../../../services/project.service";
import { ClientService } from "../../../services/client.service";


declare var $:any;
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
	public title: string;
	public proyectos: Array<Proyecto>;
	public conceptos: Array<Concepto>;
	public identity: Array<Usuario>;
	public busqueda: string = '';
	public editar_concepto: string = "";
	public permisos;
	public proyectos_activos = 0;
	public proyectos_terminados = 0;	
	public presupuestos = {aprobados:'', rechazados: '', total:''}
	public clientes = {activos:'', inactivos: '', total: ''};
	public nuevo: Proyecto;
	public users: Array<Usuario>;
	public clients: Array<Cliente>;

	public id_proyecto_gestionar: number = 0;	  
	constructor(
		private projectServices: ProjectService,
		private clientServices: ClientService, 
		private userService: UserService,
		private router: Router
	){ 
		this.title = "Proyectos";
		this.nuevo = new Proyecto('','','','','','','');
		this.identity = userService.getIdentidad();
		console.log(this.identity);
	}
  
	ngOnInit(){
		this.getProjects();
		this.getPermisosPorRol();
		this.getBudgets();
		this.getClients();
		this.getUsers();
	}
	sumbitProyecto(){
		this.projectServices.newProject(this.nuevo).subscribe(
			response => {
			if(!response.message){
				alert("No se guardó el proyecto");
			}else{
				alert(response.message);
			}
			},
			error => {
				let err = JSON.stringify(<any> error);
				console.log("errors", JSON.stringify(<any> error));
			}
		);
	}

	getProjects(){
	  this.projectServices.getProjects().subscribe(
		response => {
		  if(!response.projects){
				console.log("No hay proyectos");
			}else{
				this.proyectos = response.projects;
				let x: any[] = response.activos;
				this.proyectos_activos = x.length;
				this.proyectos_terminados = this.proyectos.length - this.proyectos_activos;
				console.log("lista de proyectos: ", this.proyectos);
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
	getPermisosPorRol(){
		let id_rol = "1"; //this.identity.id_rol;
		this.userService.getPermisosPorRol(id_rol).subscribe(
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
	getConceptsProject(proyecto_id: string){
		this.projectServices.getConceptsProject(proyecto_id).subscribe(
			response => {
				if(!response.conceptos){
					console.log("No hay conceptos");
				}else{
					this.conceptos = response.conceptos;
					console.log("lista de conceptos: ", this.conceptos);
				}
			},
			error => {
				let err = JSON.stringify(<any> error);
				console.log("errors", JSON.stringify(<any> error));        
			});
	}
	getBudgets(){
		this.projectServices.getBudgets().subscribe(
		  response => {
			if(!response.presupuestos){
				console.log("No hay presupuestos");
			}else{
				this.presupuestos.aprobados = response.aprobados;
				this.presupuestos.rechazados = response.rechazados;
				this.presupuestos.total = response.total;
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
	getClients(){
		this.clientServices.getClients().subscribe(
			response => {
			if(!response.clients){
				console.log("No hay clientes");
			}else{
				this.clients = response.clients;
				this.clientes.activos = response.activos.length;
				this.clientes.inactivos = response.inactivos.length;
				this.clientes.total = response.activos.length + response.inactivos.length;
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
			}
		);
	}
	getUsers(){
		this.userService.getUsers().subscribe(
			response => {
			if(!response.users){
				console.log("No hay usuarios");
				console.log(response);
			}else{
				this.users = response.users;
			}
			},
			error => {
				let err = JSON.stringify(<any> error);
				console.log("errors", JSON.stringify(<any> error));

				if(err.indexOf('token_expired')){
					alert("El token de seguridad ha expirado, inicia sesión nuevamente por seguridad");
					this.router.navigate(['/adminlog']);
				}
			}
		);
	}
}
