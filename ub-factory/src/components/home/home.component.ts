import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { HomeService } from './home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  slides = [
    {
      image: 'assets/images/slide1.jpg',
      header: 'Discover our exclusive collection',
      overlayColor: 'rgba(0, 0, 0, 0.5)'
    },
    {
      image: 'assets/images/slide2.jpg',
      header: 'Shop the latest trends',
      overlayColor: 'rgba(0, 0, 0, 0.5)'
    },
    {
      image: 'assets/images/slide3.jpg',
      header: 'Find your perfect style',
      overlayColor: 'rgba(0, 0, 0, 0.5)'
    }
  ];
  products:any =[];
  categories = [
    {
      id: 1,
      name: 'Category 1',
      image: 'assets/images/category1.jpg'
    },
    {
      id: 2,
      name: 'Category 2',
      image: 'assets/images/category2.jpg'
    },
    // Add more categories...
  ];

  brands = [
    {
      id: 1,
      name: 'Brand 1',
      logo: 'assets/images/brand1.jpg'
    },
    {
      id: 2,
      name: 'Brand 2',
      logo: 'assets/images/brand2.jpg'
    },
    // Add more brands...
  ];
  cartItems$: any;
  loggedIn:any=false;
  marqueeName:any;

  constructor(private cartService: CartService,private homeService:HomeService,private _snackbar:MatSnackBar,) {
    this.cartItems$ = this.cartService.cartItems.asObservable();
  }
  getProducts(){
    this.homeService.getProducts().subscribe(
      (res:any)=>{
     console.log(res);
    

      if(res.status=="SUCCESS"){
        console.log(res.listData);
     const mappedProducts = res.listData.map((product:any) => ({
      id: product.productId,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 0,
      image: "https://ubfactory.in/wp-content/uploads/2023/04/Premium-Idly-Batter-1Ltr-UB-Factory-300x321.jpg",
      itemsLeft:product.quantity,
      originalPrice:product.originalPrice
    }));
    this.products=mappedProducts;
    console.log(this.products);
    this.updateProductQuantitiesFromCart();
      } else{
       
     
      }
      },
      (error)=>{
        console.log(error);
        this._snackbar.open(error.toString(),'close',{ 
          duration: 1000
      });
        
      }
    )
  }
  ngOnInit() {
    this.getProducts();
    this.cartService.cartItems.subscribe((cartItems: Product[]) => {
      this.updateProductQuantitiesFromCart();
    });
    this.getMarqueeByName();
  }
  updateProductQuantitiesFromCart() {
    const cartItems = this.cartService.getCart();
    console.log(cartItems);
    this.products = this.products.map((product:any) => {
      console.log(product);
      const cartItem = cartItems.find((item) => item.id === product.id);
      console.log(cartItem);

      return { ...product, quantity: cartItem ? cartItem.quantity : 0 };
    });
  }

  addToCart(product: Product) {
    if (this.loggedIn) {
      // Call addToCartApi() from your api.service.ts and handle the response.
    } else {
      this.cartService.addToCart(product);
    }
    product.quantity++;

  }
  

  increaseQuantity(product: Product): void {
    product.quantity++;

    if (this.loggedIn) {
      // Call addToCartApi() from your api.service.ts and handle the response.
    } else {
      this.cartService.increaseQuantity(product);
    }
  }
  
  decreaseQuantity(product: Product): void {

    if (product.quantity > 0) {
      product.quantity--;

      if (this.loggedIn) {
        // Call addToCartApi() from your api.service.ts and handle the response.
      } else {
        this.cartService.decreaseQuantity(product);
      }
    }
  }

  getMarqueeByName(){
    this.homeService.getMarqueybyName('delivery').subscribe(
      (res:any)=>{
     console.log(res);
     this.marqueeName=res.data.marqueeText;
    // this.products=mappedProducts;
    console.log(this.products);
      if(res.status=="SUCCESS"){
       
      } else{
       
     
      }
      },
      (error)=>{
        console.log(error);
        this._snackbar.open(error.toString(),'close',{ 
          duration: 1000
      });
        
      }
    )
  }
}
// interface Product {
//   id:any;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image: string;
// }
