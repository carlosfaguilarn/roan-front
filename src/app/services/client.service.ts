import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { GLOBAL } from "./global";
import { UserService } from "./user.service";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url: string;
  public token: string;
  constructor(private http: Http, private userService: UserService) { 
    this.url = GLOBAL.url;
    this.token = userService.getToken();
  }

  getClients(){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token
    });
    
    return this.http.get(this.url+'api/clientes', {headers:headers}).map(res => res.json());
  }
  newClient(request){
		let params = JSON.stringify(request);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token
    });

    return this.http.put(this.url+'api/cliente', params, {headers: headers}).map(res => res.json());
  }

  editClient(request, id:string){
		let params = JSON.stringify(request);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token
    });
    return this.http.post(this.url+'api/editcliente/'+id, params, {headers: headers}).map(res => res.json());
	}
}
