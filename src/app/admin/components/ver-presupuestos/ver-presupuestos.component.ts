import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProjectService } from "../../../services/project.service";
import { Presupuesto } from "../../../models/presupuesto.model";
import { GLOBAL } from "../../../services/global";

@Component({
  selector: 'app-ver-presupuestos',
  templateUrl: './ver-presupuestos.component.html'
})
export class VerPresupuestosComponent implements OnInit {
  public title: string;
  public presupuestos: Presupuesto;
  public url: string;
  constructor(private projectServices: ProjectService, private router: Router) { 
    this.title = "Lista de presupuestos";
    this.presupuestos = new Presupuesto ('','','','','','');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getBudgets();
  }
  getBudgets(){
	  this.projectServices.getBudgets().subscribe(
		response => {
		  if(!response.presupuestos){
				console.log("No hay presupuestos");
			}else{
				this.presupuestos = response.presupuestos;
				console.log("lista de presupuestos: ", this.presupuestos);
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
