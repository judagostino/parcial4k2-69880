import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {Contrato} from '../models/contrato';
import{ HttpClient,HttpHeaders,HttpErrorResponse,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class ContratoService {
  resourceUrl:string;
  
  constructor(private httpCliente: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/Contratos";
   }
get(){
      return this.httpCliente.get(this.resourceUrl);
    }

    post(obj:Contrato){
      return this.httpCliente.post(this.resourceUrl,obj);
    }
}