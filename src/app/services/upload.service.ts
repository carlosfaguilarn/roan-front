import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { formatDate } from '@angular/common';
import * as jspdf  from "jspdf";
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  makePDFRequest(url:string, file:any, name:string){
    return new Promise(function(resolve, reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        formData.append(name, file);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response);
                }
            }
        }
        xhr.open('POST', url, true);
        xhr.send(formData);
    });
  }


  makeFileRequest(url:string, files:Array<File>, name:string, id:string){
    return new Promise(function(resolve, reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i=0; i<files.length; i++){
            formData.append(name, files[i]);
        }
        formData.append('id', id);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response);
                }
            }
        }
        xhr.open('POST', url, true); 
        //token =  localStorage.getItem('token'); 
        //xhr.setRequestHeader('Authorization', token);
        
        xhr.send(formData);
    });
  }
}
