import { Component, OnInit } from '@angular/core';
import { Servicio } from "../../../models/servicio.model";
import { ServiciosService } from "../../../services/servicios.service";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers: [ServiciosService]
})
export class ServiciosComponent implements OnInit {
  public servicios : Array<Servicio>;
  public busqueda: string = '';
  constructor(
    private _serviciosServices: ServiciosService,
    private router: Router
  ){ 
    this.getServices();
  }

  ngOnInit(){
    if(!this.servicios){
       
    }
  }
  
  getServices(){
    this._serviciosServices.getServices().subscribe(
      response => {
        if(!response.services){
          console.log("No hay servicios");
        }else{
          this.servicios = response.services;
          console.log("lista de servicios: ", this.servicios);
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
