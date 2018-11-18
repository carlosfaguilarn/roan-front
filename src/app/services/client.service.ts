import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { GLOBAL } from "./global";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url: string;
  constructor(private http: Http) { 
    this.url = GLOBAL.url;
  }

  getClients(){
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    
    return this.http.get(this.url+'api/clientes', {headers:headers}).map(res => res.json());
  }
  newClient(request){
		let params = JSON.stringify(request);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.put(this.url+'api/cliente', params, {headers: headers}).map(res => res.json());
  }

  editClient(request, id:string){
		let params = JSON.stringify(request);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.url+'api/editcliente/'+id, params, {headers: headers}).map(res => res.json());
	}
}
