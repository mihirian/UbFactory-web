import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product } from 'src/app/shared/models/product.model';
import { HomeService } from '../home/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  cartItems$: any;
  loggedIn:any=false;
  products :any= [];
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
  constructor(private _snackbar:MatSnackBar,private cartService: CartService,private homeService:HomeService,) {
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
    this. getProducts()
    // this.updateProductQuantitiesFromCart();

    this.cartService.cartItems.subscribe((cartItems: Product[]) => {
      this.updateProductQuantitiesFromCart();
    });
  }
  updateProductQuantitiesFromCart() {
    const cartItems = this.cartService.getCart();

    this.products = this.products.map((product:any) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
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
}
