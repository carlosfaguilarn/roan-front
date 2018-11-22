import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map"; 
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import { Servicio } from "../models/servicio.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService{
	public url: string;
	public token: string;

	constructor(private http: Http, private userService: UserService) { 
		this.url = GLOBAL.url;
		this.token = userService.getToken();
	}

	getServices(){
			let headers = new Headers({
					'Content-Type':'application/json',
					'Authorization':'Bearer '+this.token
			});
			return this.http.get(this.url+'api/servicios', {headers: headers}).map(res => res.json());
	}
	getAds(){
		let headers = new Headers({
				'Content-Type':'application/json',
				'Authorization':'Bearer '+this.token
		});
		return this.http.get(this.url+'api/anuncios', {headers: headers}).map(res => res.json());
}
	newAd(request){
		let params = JSON.stringify(request);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':'Bearer '+this.token
		});

		return this.http.put(this.url+'api/anuncio', params, {headers: headers}).map(res => res.json());
	}
}