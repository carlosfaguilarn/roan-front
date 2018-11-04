import { Component, OnInit } from '@angular/core';
import { Anuncio } from "../../../models/anuncio.model";

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {
  public title: string;
  public anuncios: Array<Anuncio>;
  constructor() {
    this.title = "Anuncios publicitarios";
    this.anuncios = [
      {id:"1",descripcion:"Construye ya tu hogar", img:"http://www.euroempresas.es/imgarchivo/2009094/200909115459_74767700-grande2.jpg"},
      {id:"3",descripcion:"Servicios de construcción", img:"http://static.websguru.com.ar/var/m_a/a0/a0f/66532/971598-contratistas-generales-aymar-e-i-r-l-banner.jpg"},
      {id:"4",descripcion:"Construcción de departamentos", img:"https://www.staffdigital.pe/blog/wp-content/uploads/panel-galeon-01.jpg"},
      {id:"5",descripcion:"Contratistas, proveedores y profesionales", img:"https://www.agendaconstruccion.cl/wp-content/uploads/2017/03/AgendaConstruccion-Banner2.jpg"},
    ];
  }

  ngOnInit() {
  }

}
