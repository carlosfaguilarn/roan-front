import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Proyecto } from "../../../models/proyecto.model";
import { ProjectService } from "../../../services/project.service";
import { UploadService } from "../../../services/upload.service";
import { UserService } from "../../../services/user.service";
import { GLOBAL } from "../../../services/global";
import * as jspdf  from "jspdf";
import html2canvas from 'html2canvas';  
//import * as $ from 'jquery';
//Variable globar para usar jQuery
declare var $:any;


@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  public title: string;
  public proyecto_seleccionado = {};
  public org = {};
  public proyectos: Array<Proyecto>;
  public materiales: Array<object> = [];
  public stringArr: Array<String> = [];
  public mano_obra: Array<object> = [];
  public stringArr2: Array<String> = [];
  public total_material;
  public total_mano;
  public proyecto_id = 10000;
  public url;
  public fecha: string;
  public presupuesto = {
    "proyecto_id":'',
    "descripcion":'',
    "cliente":'',
    "ubicacion":'',
    "url":'',
    "proyecto":''
  };
  

  @ViewChild('content') content: ElementRef;
   
  constructor(private projectService: ProjectService, private userService: UserService, private uploadService: UploadService){  
    this.title = "Generar presupuesto"; 
    this.url = GLOBAL.url;
  } 
  verp(){
    alert(this.presupuesto['descripcion']);
  }
  llenarPresupuesto(){
    console.log(this.presupuesto);
  }

  modalDescripcion(){
    //console.log('Pedir descripción');
    $("#llenarDescripcion").modal('show');
  }

  llenarDescripcion(){
    console.log(this.presupuesto);
  }

  ngOnInit() {
    this.getProjects();
    this.getOrgName();

    //Obtener fecha actual
    let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    let f = new Date();
    this.fecha = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();

    var $TABLE_MATERIAL = $('#table_material');
    var $TABLE_MANO = $('#table_mano');
    var $BTN = $('#export-btn');
    var $EXPORT = $('#export');
      
    $('.add-row').click(function () { 
        var $clone = $TABLE_MATERIAL.find('tr.hide').clone(true).removeClass('hide table-line');
        $TABLE_MATERIAL.find('table').append($clone); 
    });

    $('.add-row2').click(function () { 
      var $clone = $TABLE_MANO.find('tr.hide').clone(true).removeClass('hide table-line');
      $TABLE_MANO.find('table').append($clone); 
  });
    $('.table-remove').click(function () {
      $(this).parents('tr').detach(); 
    });
    $(".costo").keypress(function(tecla){
        if(tecla.key == "Enter"){
            let cantidad = $(this).parents('tr').find("td").eq(0).html();
            let costo    = $(this).parents('tr').find("td").eq(2).html();
            let subtotal = cantidad*costo;

            $(this).parents('tr').find("td").eq(3).html(subtotal);
            tecla.preventDefault();
        }
    });

    $('.table-up').click(function () {
      var $row = $(this).parents('tr');
      if ($row.index() === 1) return; // Don't go above the header
      $row.prev().before($row.get(0));
    });

    $('.table-down').click(function () {
      var $row = $(this).parents('tr');
      $row.next().after($row.get(0));
    });

    // A few jQuery helpers for exporting only
    //jQuery.fn.pop = [].pop;
    //jQuery.fn.shift = [].shift;

    $BTN.click(function () {
      var $rows = $TABLE_MATERIAL.find('tr:not(:hidden)');
      var headers = [];
      var data = [];

      // Turn all existing rows into a loopable array
      $rows.each(function () {
      var $td = $(this).find('td');
      var h = {};

      // Use the headers from earlier to name our hash keys
      headers.forEach(function (header, i) {
        h[header] = $td.eq(i).text();
      });

      data.push(h);
    });
    // Output the result
    $EXPORT.text(JSON.stringify(data));
    });
  }
  abrirModalPresupuesto(){
    var $TABLE_MATERIAL = $('#tabla_materiales');
    var $TABLE_MANO = $('#table_mano');
    var total1 = 0;
    var total2 = 0;

    var temp = [];
    
    let reservationArr : Array<object> = [];
    //******************************* Recojer datos de materiales ***************************** */
    $TABLE_MATERIAL.find("tr:not(:hidden)").find('.dato').each(function(index) {
      //Agregar celda al arreglo temporal
      temp.push($(this).html());
      //Si se terminó la fila, agregar al arreglo final
      if(temp.length == 4){
        reservationArr.push({cantidad: temp[0], descripcion: temp[1], precio: temp[2], total:temp[3]});
        total1 += Number(temp[3]);
        temp = [];
      }
    });
    this.total_material = total1;
    console.log("Total material: "+this.total_material);
    this.materiales = reservationArr;
    temp = [];
    let reservationArr2 : Array<object> = [];
    /******************************* Recojer datos de mano de obra ****************************/
    $TABLE_MANO.find("tr:not(:hidden)").find('.dato').each(function(index) {
      //Agregar celda al arreglo temporal
      temp.push($(this).html());
      //Si se terminó la fila, agregar al arreglo final
      if(temp.length == 4){
        reservationArr2.push({cantidad: temp[0], descripcion: temp[1], precio: temp[2], total:temp[3]});
        total2 += Number(temp[3]);
        console.log(Number(temp[3]));
        temp = [];
      }
    });
    this.total_mano = total2;
    console.log("Total mano obra: "+this.total_mano);
    this.mano_obra = reservationArr2;
  } 
  
  public guardarPresupuesto(){  
    var data = document.getElementById('contentToConvert'); 
    data.classList.remove("medio");
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;   
      pdf.addImage(contentDataURL, 'JPEG', 0, 15, imgWidth, imgHeight);
       
      let file = pdf.output('blob');
      
     this.uploadService.makePDFRequest(this.url+'api/guardarpdf', file, 'pdf')
     .then((result:any) => {
        console.log("archivo pdf: ", result.pdf);
        //Registrar presupuesto en la base de datos
        this.presupuesto.url = result.pdf;
        if(this.proyecto_id != 10000){
          this.presupuesto.cliente = this.proyectos[this.proyecto_id].cliente;
          this.presupuesto.proyecto = this.proyectos[this.proyecto_id].titulo;
          this.presupuesto.proyecto_id = this.proyectos[this.proyecto_id].id;
        }else{
          //proyecto_id es nulo porque no se eligió un proyecto;
          console.log(this.presupuesto);
        }
        this.saveBudget();
     });
    });  
  } 
  saveBudget(){
    this.projectService.newBudget(this.presupuesto).subscribe(
      response => {
        if(!response.message){
          alert("No se guardó el presupuesto");
        }else{
          alert("Presupuesto guardado correctamente");
        }
      },
      error => {
        let err = JSON.stringify(<any> error);
        console.log("errors", JSON.stringify(<any> error));
      });
  }
  getProjects(){
	  this.projectService.getProjects().subscribe(
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
		});
  }
  getOrgName(){
	  this.userService.getOrgName().subscribe(
		response => {
		  if(!response.org){
				console.log("No hay datos de la organizacion");
			}else{
				this.org = response.org;
				console.log("Datos de la org: ", this.org);
		  }
		},
		error => {
			let err = JSON.stringify(<any> error);
			console.log("errors", JSON.stringify(<any> error));
		});
	}
}