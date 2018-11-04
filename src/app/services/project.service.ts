import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map"; 
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import { Proyecto } from "../models/proyecto.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService{
	public url: string;
	public token: string;

	constructor(private http: Http, private userService: UserService) { 
		this.url = GLOBAL.url;
		this.token = userService.getToken();
	}

	getProjects(){
			let headers = new Headers({
					'Content-Type':'application/json',
					'Authorization':'Bearer '+this.token
			});
			console.log("Token projectos: "+this.token);
			return this.http.get(this.url+'api/proyectos', {headers: headers}).map(res => res.json());
	}

	getConceptsProject(proyecto_id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token
    });
    return this.http.get(this.url+'api/conceptos/'+proyecto_id, {headers:headers}).map(res => res.json());
  }
}