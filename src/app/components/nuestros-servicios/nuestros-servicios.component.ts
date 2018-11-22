import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "../../services/global";
import { ServiciosService } from "../../services/servicios.service";
import { Anuncio } from "../../models/anuncio.model";
@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.component.html',
  styleUrls: ['./nuestros-servicios.component.css']
})
export class NuestrosServiciosComponent implements OnInit {
  public title = "Nuestros servicios";
  public anuncios: Array<Anuncio>;
  public url: string;
  
  constructor(private serviciosSerice: ServiciosService) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAds();
  }
  
  getAds(){
    this.serviciosSerice.getAds().subscribe(
      response=>{
        if(!response.anuncios){
          console.log("No hay anuncios");
        }else{
          this.anuncios = response.anuncios;
        }
      },error=>{
        console.log("Error al buscar anuncios");
      }
    );
  }
}
