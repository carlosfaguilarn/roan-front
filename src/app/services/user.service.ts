import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { GLOBAL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private http: Http) { 
    this.url = GLOBAL.url;
  }

  signup(user_to_login){
    let params = JSON.stringify(user_to_login);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'origin-list'
    });
    return this.http.post(this.url+'api/login', params, {headers:headers}).map(res => res.json());
  }
  getUsers(){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });
    
    return this.http.get(this.url+'api/usuarios', {headers:headers}).map(res => res.json());
  }
  asignRolUser(request){
    let params = JSON.stringify(request);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });

    return this.http.put(this.url+'api/asignar_rol', params, {headers: headers})
                    .map(res => res.json());
  }
  asignPermisionRole(request){
    let params = JSON.stringify(request);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });

    return this.http.put(this.url+'api/asignar_permiso', params, {headers: headers})
                    .map(res => res.json());
  }
  getRoles(){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });
    return this.http.get(this.url+'api/roles', {headers:headers}).map(res => res.json());
  }
  getPermisos(){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });
    return this.http.get(this.url+'api/permisos', {headers:headers}).map(res => res.json());
  }
  getPermisosPorRol(rol: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });
    return this.http.get(this.url+'api/permisos_por_rol/'+rol, {headers:headers}).map(res => res.json());
  }
  newUser(user: any){
    let params = JSON.stringify(user);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.getToken()
    });
    return this.http.put(this.url+'api/usuario', params, {headers:headers}).map(res => res.json());
  }
  getOrgName(){
    return this.http.get(this.url+'api/org').map(res => res.json());
  }

  getIdentidad(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity == "undefined") identity = null;
    return identity
  }
  getToken(){
    let token = localStorage.getItem('token');
    if(token == "undefined") token = null;
    return token;
  }     
}