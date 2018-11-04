import { Component, OnInit } from '@angular/core';
//Modelos
import { Proyecto } from "../../../models/proyecto.model";
import { ConceptoObra } from "../../../models/conceptos_obra.model";
import { Usuario } from "../../../models/usuario.model";
import { Router } from "@angular/router";

//Compontentes
import { ChartPieComponent } from "../charts/chart-pie/chart-pie.component";
import { UserService } from "../../../services/user.service";

//Servicios
import { ProjectService } from "../../../services/project.service";

declare var $:any;
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
	public title: string;
	public proyectos: Array<Proyecto>;
	public conceptos: Array<ConceptoObra>;
	public identity: Array<Usuario>;
	public busqueda: string = '';
	public editar_concepto: string = "";
	public permisos;	

	public id_proyecto_gestionar: number = 0;
	total_pendiente: string;
	total_cobrado: string;
	  
	constructor(
		private projectServices: ProjectService, 
		private userService: UserService,
		private router: Router
	){ 
		this.identity = userService.getIdentidad();
		
		console.log(this.identity);
	}
  
	ngOnInit(){
		this.getProject();
		this.getPermisosPorRol();
	}
	gestionarProyecto(proyecto_id:string){
		this.id_proyecto_gestionar = parseInt(proyecto_id);
		this.getConceptsProject(proyecto_id);

		$('#titleModalGestion').val(this.proyectos[proyecto_id].titulo);
		$('#gestionarProyecto').modal('show');
	}
	editarConcepto(id_concepto: number){
		//this.editar_concepto = this.conceptos[id_concepto];
		console.log("Concepto:", this.conceptos[id_concepto]);
		$('#editarConcepto').modal('show');
		
	}
	getProject(){
	  this.projectServices.getProjects().subscribe(
		response => {
		  if(!response.projects){
				console.log("No hay proyectos");
			}else{
				this.proyectos = response.projects;
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
}
