import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  resetForgotPassword(data:any) {
    return this._http.put(`${environment.apiUrl}`+"/change/password",data);
  }
  forgotpasswordvalidate(data:any) {
    return this._http.post(`${environment.apiUrl}`+"/forgot/password/verify-otp",data);
  }
  forgotPassword(email: any) {
    const body = { email: email.userName };
    return this._http.post(`${environment.apiUrl}/forgot-password/${email.userName}`, body);  }
  //////////
  changePassword(data:any) {
    return this._http.put(`${environment.apiUrl}`+"/change/password",data);
  }
  private loggedIn = false;

  constructor(private _http: HttpClient) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }
  

  login(email: string, password: string) {
    // Perform login logic here
      var data={
        "email":email,
        "password":password
      }
    // Assuming login is successful
    // this.loggedIn = true;
    // localStorage.setItem('loggedIn', 'true');
    // Other logic after successful login
    return this._http.post(`${environment.apiUrl}`+"/login",data);

  }

  logout() {
    // Perform logout logic here
    
    // Assuming logout is successful
    this.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    // Other logic after successful logout
    return this._http.get(`${environment.apiUrl}`+"/logout/"+localStorage.getItem("ownerId"));

  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
