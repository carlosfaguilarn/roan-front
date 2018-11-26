import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service";
import { Servicio } from "../../models/servicio.model";
import { GLOBAL } from "../../services/global";
import * as jspdf  from "jspdf";
import html2canvas from 'html2canvas';  
declare var $: any;
@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  public servicios : Array<Servicio>;
  public busqueda: string;
  public url: string;
  public cotizaciones: Array<{}>;
  public cantidad: any = "1";

  constructor(private serviciosService: ServiciosService) { 
    this.url = GLOBAL.url;
    this.cotizaciones = [{}];
  }

  ngOnInit() {
    this.getServices();
  }

  public convertirPDF(){  
    var data = document.getElementById('table-cotizacion'); 
    var aux = data.innerHTML;
    data.innerHTML = `
    <head>
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <!-- <link rel="stylesheet" href="sass/main.css" media="screen" charset="utf-8"/> -->
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta http-equiv="content-type" content="text-html; charset=utf-8">
    <style type="text/css">
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
      } 
      .medio{
        width: 1500px;
      }
      .modal2 .modal-dialog2{
        width: auto;
      }
      html {
        line-height: 1;
        font-size: 15px;
      } 
      ol, ul {
        list-style: none;
      } 
      table {
        border-collapse: collapse;
        border-spacing: 0;
      } 
      caption, th, td {
        text-align: left;
        font-weight: normal;
        vertical-align: middle;
      } 
      q, blockquote {
        quotes: none;
      }
      q:before, q:after, blockquote:before, blockquote:after {
        content: "";
        content: none;
      } 
      a img {
        border: none;
      } 
      article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
        display: block;
      } 
      body {
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 300;
        font-size: 15px;
        margin: 0;
        padding: 0;
      }
      body a {
        text-decoration: none;
        color: inherit;
      }
      body a:hover {
        color: inherit;
        opacity: 0.7;
      }
      body .container {
        min-width: 500px;
        margin: 0 auto;
        padding: 0 20px;
      }
      body .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }
      body .left {
        float: left;
      }
      body .right {
        float: right;
      }
      body .helper {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      body .no-break {
        page-break-inside: avoid;
      }
      .vertical-align{
          display: flex;
          justify-content: center;
          align-content: center;
          flex-direction: column;
      }
  
      header {
        margin-top: 20px;
        margin-bottom: 50px;
      }
      header figure {
        float: left;
        width: auto;
        height: auto;
        margin-right: 10px;
        border-radius: 100%;
        text-align: center;
      }
      header figure img {
        margin-top: 13px;
      }
      header .company-address {
        float: left;
        max-width: 450px;
        line-height: 1.7em;
      }
      header .title {
        color: #8BC34A;
        font-weight: 500;
        font-size: 50px;
        text-transform: uppercase;
      }
      header .company-contact {
        float: right;
        height: 60px;
        padding: 0 10px;
        background-color: #8BC34A;
        color: white;
      }
      header .company-contact span {
        display: inline-block;
        vertical-align: middle;
      }
      header .company-contact .circle {
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        text-align: center;
      }
      header .company-contact .circle img {
        vertical-align: middle;
      }
      header .company-contact .phone {
        height: 100%;
        margin-right: 20px;
      }
      header .company-contact .email {
        height: 100%;
        min-width: 100px;
        text-align: right;
      }
  
      section .details {
        margin-bottom: 55px;
      }
      section .details .client {
        width: 50%;
        line-height: 20px;
      }
      section .details .client .name {
        color: #8BC34A;
      }
      section .details .data {
        width: 50%;
        text-align: right;
      }
      section .details .title {
        margin-bottom: 15px;
        color: #8BC34A;
        font-size: 3em;
        font-weight: 400;
        text-transform: uppercase;
      }
      section table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 0.9166em;
      }
      section table .qty, section table .unit, section table .total {
        width: 15%;
      }
      section table .desc {
        width: 55%;
      }
      section table thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
      }
      section table thead th {
        padding: 5px 10px;
        background: #8BC34A;
        border-bottom: 5px solid #FFFFFF;
        border-right: 4px solid #FFFFFF;
        text-align: right;
        color: white;
        font-weight: 400;
        text-transform: uppercase;
      }
      section table thead th:last-child {
        border-right: none;
      }
      section table thead .desc {
        text-align: left;
      }
      section table thead .qty {
        text-align: center;
      }
      section table tbody td {
        padding: 10px;
        background: #E8F3DB;
        color: #777777;
        text-align: right;
        border-bottom: 5px solid #FFFFFF;
        border-right: 4px solid #E8F3DB;
      }
      section table tbody td:last-child {
        border-right: none;
      }
      section table tbody h3 {
        margin-bottom: 5px;
        color: #8BC34A;
        font-weight: 600;
      }
      section table tbody .desc {
        text-align: left;
      }
      section table tbody .qty {
        text-align: center;
      }
      section table.grand-total {
        margin-bottom: 45px;
      }
      section table.grand-total td {
        padding: 5px 10px;
        border: none;
        color: #777777;
        text-align: right;
      }
      section table.grand-total .desc {
        background-color: transparent;
      }
      section table.grand-total tr:last-child td {
        font-weight: 600;
        color: #8BC34A;
        font-size: 1.18181818181818em;
      }
      section table.grand-total tr:last-child td {
        font-weight: 600;
        color: #8BC34A;
        font-size: 1.18181818181818em;
      }
      .total-mano{
        font-weight: 600;
        color: #8BC34A;
        font-size: 1.18181818181818em;
      }
  
      footer {
        margin-bottom: 20px;
      }
      footer .thanks {
        margin-bottom: 40px;
        color: #8BC34A;
        font-size: 1.16666666666667em;
        font-weight: 600;
      }
      footer .notice {
        margin-bottom: 25px;
      }
      footer .end {
        padding-top: 5px;
        border-top: 2px solid #8BC34A;
        text-align: center;
      }
      .text-color-success{
        color: rgb(75, 138, 2);
      }
      .text-color-primary{
        color: rgb(46, 14, 231);
      }
      .text-color-danger{
        color: #bb0707;
      }
      .text-color-dark{
        color: #000000;
      }
      .roan-logo{
        width: 150px;
        height: 100px;
      }
      .roan-texto{
        font-size: 20px;
      }
      .borde{
        border: red solid 1px;
      }
      .padre{
        display: table;
        height:200px;
      }
      .centrar-vertical{ 
        display: table-cell;
        vertical-align: middle;
      }
    </style>
  </head>
  
  <body>
    <header class="clearfix">
      <div class="container">
        <div class="row text-center">
          <h1 class="title">ROÁN</h1>
        </div>
        <div class="row big-margin-top">
          <div class="col-lg-2 little-margin-top">
            <img class="roan-logo" src="../../../../assets/img/big-logo.png" alt="">
          </div>
          <div class="col-lg-10">
              <div class="little-margin-top big-margin-left roan-texto">
                <p>
                  <i class="fas fa-map-marker-alt text-color-dark"></i> <strong>América #2497 Las Cerezas, Los Mochis, Sin.</strong>
                </p>
                <p>
                  <i class="fas fa-phone text-color-dark"></i> <strong>(668)1-11-05-99</strong>
                </p>
                <p>
                  <i class="fas fa-at text-color-dark"></i> <strong>proyectos.roan@gmail.com</strong>
                </p>
              </div>
          </div>
        </div> 
      </div>
    </header>
    ` +  data.innerHTML + `
    <footer>
      <div class="container">
        <div class="row text-center">
          <div class="thanks">¡Esperamos tu llamada!</div>
        </div>
        
        <div class="notice">
          <div>NOTA:</div>
          <div>Los precios incluyen material y mano de obra</div>
          <div>Los precios aquí dados están sujetos a cambios sin previo aviso</div>
        </div>
        <div class="end">ROÁN: Construcciones y remodelaciones</div>
      </div>
    </footer>
    </body>
    `;
    

    html2canvas(data).then(canvas => {  
      data.innerHTML = aux;
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;   
      pdf.addImage(contentDataURL, 'JPEG', 15, 15, imgWidth-30, imgHeight);

      pdf.save('cotizacion.pdf');
      
       
      //let file = pdf.output('blob');

      //this not display my pdf document in a new tab.
      //window.open(file, '_blank');

      //this display my document pdf, but in current tab
      //window.location.href = file; 
    });  
  } 




  seleccionar(servicio){
    //alert(JSON.stringify(servicio));
    this.cotizaciones.push({
      servicio: servicio.descripcion, 
      cantidad: this.cantidad,
      unidad: servicio.unidad,
      costo: servicio.costo
    });
    this.cantidad = "1";
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
