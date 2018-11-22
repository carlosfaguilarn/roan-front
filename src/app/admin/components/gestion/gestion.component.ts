import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from "../../../services/project.service";
import { Concepto } from "../../../models/conceptos.model";
import { Proyecto } from "../../../models/proyecto.model";
import { UploadService } from "../../../services/upload.service";
import { GLOBAL } from "../../../services/global";
declare var $ : any;

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  public conceptos: Array<Concepto>;
  public nuevo_concepto: Concepto;
  public editar_concepto: Concepto;
  public proyecto: Proyecto;
  public total_pendiente: string = "0";
  public total_cobrado: string = "0";
  public avance: string = "%0";
  public proyecto_id: string;
  public url: string;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router, 
    private _projectServices: ProjectService,
    private _uploadService: UploadService
  ){
    this.nuevo_concepto = new Concepto('', '', '', '', '', '');
    this.editar_concepto = new Concepto('', '', '', '', '', '');
    this.proyecto = new Proyecto('', '', '', '', '', '', '');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.proyecto_id = params['id'];
    });
    console.log(this.proyecto_id);
    this.getConceptsProject();
    this.getProject();
  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
  }
  nuevoConcepto(){
    this.nuevo_concepto.proyecto_id = this.proyecto_id;
    console.log(this.nuevo_concepto);

    this._projectServices.newConcept(this.nuevo_concepto).subscribe(
      response => {
        if(!response.concept){
          alert("Hubo un error al guardar la tarea");
        }else if(!this.filesToUpload){
          alert("Tarea agregada sin evidencias");
        }else{
          //subida de imagen
          this._uploadService.makeFileRequest(this.url+'api/guardarimagen', this.filesToUpload, 'img', response.concept.id)
          .then((result:any) => {
              this.nuevo_concepto.evidencia = result.img;
              console.log(this.nuevo_concepto);
          });
          this.filesToUpload.length = 0;
          alert("Se agregó la tarea correctamente");
        }
        this.getConceptsProject();
        this.getProject();
      },
      error => {
        var errorMessage = <any> error;
        if(errorMessage!=null){
          //this.status = 'error';
        }
      }
    );
    this.getConceptsProject();
  }
  getConceptsProject(){
    this._projectServices.getConceptsProject(this.proyecto_id).subscribe(
      response => {
        if(!response.conceptos.concepts){
          console.log("No hay conceptos");
        }else{
          this.conceptos = response.conceptos.concepts;
          this.total_cobrado = response.conceptos.total_cobrado;
          this.total_pendiente  = response.conceptos.total_pendiente;
          this.avance = response.conceptos.avance.toFixed(2);
          console.log("lista de conceptos: ", this.conceptos);
        }
      },
      error => {
        let err = JSON.stringify(<any> error);
        console.log("errors", JSON.stringify(<any> error));        
      }
    );
  }

  verConcepto(id_concepto: number){
    console.log(id_concepto);
    console.log("Concepto:", this.conceptos[id_concepto]);
    this.editar_concepto = this.conceptos[id_concepto];
    console.log("Editar concepto:", this.editar_concepto);

    $('#editarConcepto').modal('show');	

  }
  editarConcepto(){
    this._projectServices.editConcept(this.editar_concepto).subscribe(
      response => {
        if(!response.message){
          console.log("Hubo algún error al editar");
          console.log(response);
        }else{
          if(this.filesToUpload){
            //subida de imagen
            this._uploadService.makeFileRequest(this.url+'api/guardarimagen', this.filesToUpload, 'img', response.concept.id)
            .then((result:any) => {
                this.nuevo_concepto.evidencia = result.img;
                console.log(this.nuevo_concepto);
                this.getConceptsProject();
            });
          }
          this.filesToUpload.length = 0;
          this.getConceptsProject();
          this.getProject();
          alert(response.message);
        }
      },
      error => {
        let err = JSON.stringify(<any> error);
        console.log("errors", JSON.stringify(<any> error));        
      });
  }
  getProject(){
	  this._projectServices.getProject(this.proyecto_id).subscribe(
		response => {
		  if(!response.proyecto){
				console.log("No se encontró el proyecto ["+this.proyecto_id+"]");
			}else{
				this.proyecto = response.proyecto;
				console.log("Proyecto encontrado: ", this.proyecto);
		  }
		},
		error => {
			let err = JSON.stringify(<any> error);
			console.log("errors", JSON.stringify(<any> error));

			if(err.indexOf('token_expired')){
				alert("El token de seguridad ha expirado, inicia sesión nuevamente por seguridad");
				//this.router.navigate(['/adminlog']);
			}
		});
	}
}
