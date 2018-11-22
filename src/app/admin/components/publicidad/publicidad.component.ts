import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Anuncio } from "../../../models/anuncio.model";
import { Servicio } from "../../../models/servicio.model";
import { ServiciosService } from "../../../services/servicios.service";
import { UploadService } from "../../../services/upload.service";
import { GLOBAL } from "../../../services/global";
declare var $: any;
@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {
  public title: string;
  public anuncios: Array<Anuncio>;
  public servicios: Array<Servicio>;
  public anuncio: any;
  public servicio_id: any;
  public url;
  constructor(private serviciosService: ServiciosService, private router: Router, private uploadService: UploadService) {
    this.title = "Anuncios publicitarios";
    this.url = GLOBAL.url; 
    this.anuncio = {
      "descripcion":""
    };
  }

  ngOnInit() {
    this.getAds();
    this.getServicios();
  }

  getAds(){
	  this.serviciosService.getAds().subscribe(
		response => {
		  if(!response.anuncios){
				console.log("No hay anuncios");
			}else{
				this.anuncios = response.anuncios;
				console.log("lista de anuncios: ", this.anuncios);
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
  getServicios(){
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

			if(err.indexOf('token_expired')){
				alert("El token de seguridad ha expirado, inicia sesión nuevamente por seguridad");
				this.router.navigate(['/adminlog']);
			}
		});
  }
  
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
  }

  subirAnuncio(){
    console.log("subiendo anuncio", this.anuncio);
    this.serviciosService.newAd(this.anuncio).subscribe(
			response => {
        if(!response.message){
          alert("No se guardó el anuncio");
        }else{
          //subir imagen del anuncio
          this.uploadService.makeFileRequest(this.url+'api/guardar_img_ad', this.filesToUpload, 'img', response.created.id)          
          .then((result:any) => {
              console.log(result.img);
              $("#agregarAnuncio").modal('toggle');
              alert(response.message);
          });				
        }
        this.getAds();
			},
			error => {
				let err = JSON.stringify(<any> error);
				console.log("errors", JSON.stringify(<any> error));
			}
		);
  }
}