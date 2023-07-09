import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  getOrderHistory(data:any) {
    return this._http.post(`${environment.apiUrl}`+"/razorpay/ordersearch",data);
  }
  constructor(private _http: HttpClient) { }
}
