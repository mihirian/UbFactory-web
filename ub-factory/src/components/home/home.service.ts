import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }

    // createOrder(order: OrderRequest): Observable<OrderResponse> {
  //   return this.http.post<OrderResponse>(`${this.apiURL}/create-order`, order);
  // }
  getProducts(){  
    
    return this._http.get(`${environment.apiUrl}`+"/product");
    }
    getMarqueybyName(marqueeName:any){
      return this._http.get(`${environment.apiUrl}`+"/searchMarqueText/"+marqueeName);

    }
}
