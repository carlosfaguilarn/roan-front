import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service";
import { Servicio } from "../../models/servicio.model";
import { GLOBAL } from "../../services/global";

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  public servicios : Array<Servicio>;
  public busqueda: string;
  public url: string;

  constructor(private serviciosService: ServiciosService) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getServices();
  }
  getServices(){
    this.serviciosService.getServices().subscribe(
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
     
    });
  }
}
