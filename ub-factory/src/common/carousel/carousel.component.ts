import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { CarouselService } from './carousel.service';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  caroselimagesResponse:any[]=[];
  offerimagesResponse: any[]=[];
  slides:any = [];
  constructor(private _carouselService:CarouselService) { }

  ngOnInit(): void {
    this.getCaroselimages();

  }
  getCaroselimages(){
    this._carouselService.getcarousaldata().subscribe(
      (res:any)=>{
     console.log(res);
     if(res.status=='SUCCESS'){
           this.slides=res.listData;

     }
      // if(res.result!=undefined&&res.result.status=="SUCCESS"){
      //   this.offerimagesResponse=res.result.payload.marketPlaceSearchObject;
      //   console.log("hi");
      //   this.getOfferImages();
      // } else{
       
      // }
      },
      (error)=>{

        console.log(error);
      }
    )
    
  }
  

}
