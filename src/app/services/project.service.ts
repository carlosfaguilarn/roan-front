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
	newProject(request){
		let params = JSON.stringify(request);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':'Bearer '+this.token
		});

		return this.http.put(this.url+'api/proyecto', params, {headers: headers}).map(res => res.json());
	}

	getProjects(){
			let headers = new Headers({
					'Content-Type':'application/json',
					'Authorization':'Bearer '+this.token
			});
			console.log("Token projectos: "+this.token);
			return this.http.get(this.url+'api/proyectos', {headers: headers}).map(res => res.json());
	}
	getProject(id:string){
		let headers = new Headers({
				'Content-Type':'application/json',
				'Authorization':'Bearer '+this.token
		}); 
		return this.http.get(this.url+'api/proyecto/'+id, {headers: headers}).map(res => res.json());
	}

	getConceptsProject(proyecto_id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token
    });
    return this.http.get(this.url+'api/conceptos/'+proyecto_id, {headers:headers}).map(res => res.json());
	}
	newConcept(request){
		let params = JSON.stringify(request);
    let headers = new Headers({'Content-Type':'application/json'});

    return this.http.put(this.url+'api/nuevoconcepto', params, {headers: headers}).map(res => res.json());
	}
	editConcept(request){
		let params = JSON.stringify(request);
    let headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.url+'api/editarconcepto', params, {headers: headers}).map(res => res.json());
	}

	newBudget(request){
		let params = JSON.stringify(request);
    let headers = new Headers({'Content-Type':'application/json'});

    return this.http.put(this.url+'api/presupuesto', params, {headers: headers}).map(res => res.json());
	}

	getBudgets(){
		let headers = new Headers({
				'Content-Type':'application/json'
		}); 
		return this.http.get(this.url+'api/presupuestos', {headers: headers}).map(res => res.json());
	}
}