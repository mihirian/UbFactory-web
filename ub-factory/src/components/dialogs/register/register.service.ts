import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) {}

  register(data:any) {
    // Perform login logic here
     
    // Assuming login is successful
    // this.loggedIn = true;
    // localStorage.setItem('loggedIn', 'true');
    // Other logic after successful login
    return this._http.post(`${environment.apiUrl}`+"/customer/registration",data);

  }

}
