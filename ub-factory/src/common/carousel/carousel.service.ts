import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private _http: HttpClient) { }

  getcarousaldata(){
    return this._http.get(`${environment.apiUrl}`+"/banner");

  }
  // getOfferdata() {
  //   var webUrl = window.location.origin;
  //   webUrl = webUrl.replace(/^http[s]?:\/\/www\.|http[s]?:\/\/|www\./,'');
  //   var clientId = webUrl;
  //   var url = `https://preprod.paymonk.com/megatron/fetchdata/login?id=https://preprod.paymonk.com/shreedhan-web/&clientId=paymonk`;
  //   return this._http.get(url);
  // }
}
