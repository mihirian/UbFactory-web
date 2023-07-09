import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) {
   }

  getCustomerDetailsById(data:any) {
    return this._http.get(`${environment.apiUrl}`+"/get/customer_byid/"+data);
  }
  updateAddress(data:any) {
    return this._http.post(`${environment.apiUrl}`+"/add/address",data);
  }
}
