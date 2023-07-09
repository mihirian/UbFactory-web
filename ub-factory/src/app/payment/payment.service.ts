import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CaptureRequest, OrderRequest, OrderResponse } from '../shared/models/product.model';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiURL = 'http://localhost:8080'; // Update this with your backend API URL

  constructor(private _http: HttpClient,private http: HttpClient) {}

  // createOrder(order: OrderRequest): Observable<OrderResponse> {
  //   return this.http.post<OrderResponse>(`${this.apiURL}/create-order`, order);
  // }
  createOrder(order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic cnpwX3Rlc3RfWFZFSEh4dDFZT1BZN3E6c3pBSWpUZUp3YnVjV0thaVRLM2l0cEJZ'
    });
  
    const body = {
      amount:11.00, // Convert to paisa
      currency: order.currency,
      customerId:21,
      // receipt: 'receipt#1',
 
    };
  
  return this._http.post(`${environment.apiUrl}`+"/razorpay/create-order",body);
  }

  // capturePayment(payment: CaptureRequest): Observable<OrderResponse> {
  //   return this.http.post<OrderResponse>(`${this.apiURL}/capture-payment`, payment);
  // }
  capturePayment(payment: any) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Basic cnpwX3Rlc3RfWFZFSEh4dDFZT1BZN3E6c3pBSWpUZUp3YnVjV0thaVRLM2l0cEJZ'
    // });
  
    // const body = {
    //   amount: payment.amount * 100 // Convert to paisa
    // };
  
    // return this.http.post<OrderResponse>(
    //   `/api/v1/payments/${payment.paymentId}/capture`,
    //   body,
    //   { headers }
    // );
    console.log(payment)
    // return this._http.post(`${environment.apiUrl}`+"/razorpay/capture/payment",payment);
    return this._http.post(`${environment.apiUrl}`+"/razorpay/capture/payment",payment);

    
  }
  createCOD(data:any){

  
  return this._http.post(`${environment.apiUrl}`+"/razorpay/instamojo/create-order",data);
  }
}
