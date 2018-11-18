import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "../../services/global";
@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.component.html',
  styleUrls: ['./nuestros-servicios.component.css']
})
export class NuestrosServiciosComponent implements OnInit {
  public title = "Nuestros servicios";
  public url: string;
  
  constructor() { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

}
