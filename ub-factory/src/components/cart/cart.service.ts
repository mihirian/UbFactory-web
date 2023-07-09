import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  public cartItems = new BehaviorSubject<Product[]>([]);
public shippingCharge:any;
  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartItems.next(this.cart);
      if(this.isLoggedIn()){
        this.syncCartWithServer();
        this.fetchCartFromServer();
      }
    }
  }

  syncCartWithServer(){
    const customerId = localStorage.getItem('ownerId'); // Adjust as per your application
    this.cart.forEach(product => {
      this.http.post(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items`, {
        productId: product.id,
        quantity: product.quantity
      }).subscribe();
      // Server syncing done, now clear the local cart
      this.cart = [];
      localStorage.removeItem('cart');
    })
  }
  fetchCartFromServer() {
    const customerId = localStorage.getItem('ownerId'); // Adjust as per your application
    if (this.isLoggedIn()) {
      this.http.get(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}`)
        .subscribe((response: any) => {
          this.cart = response.cartItems.map((item :any)=> ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            quantity: item.quantity,
            description:item.description,
            image:item.image,
            originalPrice:item.originalPrice,
          }));
          this.cartItems.next(this.cart);
          this.saveCartToLocalStorage();
        });
    }
  }
  getTax(){
   return this.http.get(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/getcharges`)
  }

  addToCart(product: Product) {
    const customerId = localStorage.getItem('ownerId'); // Adjust as per your application
    if (this.isLoggedIn()) {
      console.log(product);
      this.http.post(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items`, {
        productId: product.id,
        quantity: 1
      }).subscribe((response: any) => {
        // product.itemId=response.itemId;
        // product.id = response.itemId; // Store itemId for future updates
        this.cart.push(product);
        this.cartItems.next(this.cart);
        this.saveCartToLocalStorage();
      });
      this.fetchCartFromServer()
    } else {
      this.addToCartLocalStorage(product);
    }
  }

  addToCartLocalStorage(product: Product) {
    const cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartItems.next(this.cart);
    this.saveCartToLocalStorage();
  }

  removeFromCart(product: Product) {
    const customerId = localStorage.getItem('ownerId'); // Adjust as per your application
    if (this.isLoggedIn()) {
      this.http.delete(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items/${product.id}`).subscribe(() => {
        this.removeFromCartLocalStorage(product);
      });
    } else {
      this.removeFromCartLocalStorage(product);
    }
  }

  removeFromCartLocalStorage(product: Product) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartItems.next(this.cart);
      this.saveCartToLocalStorage();
    }
  }

  increaseQuantity(product: Product) {
    const customerId = localStorage.getItem('ownerId');
    
    console.log(product) // Adjust as per your application
    if (this.isLoggedIn()) {
      this.http.put(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items/${product.id}`, {
        quantity: product.quantity
      }).subscribe((response: any) => {
        product.quantity = response.quantity;
        this.increaseQuantityLocalStorage(product);

        // this.cartItems.next(this.cart);
        // this.saveCartToLocalStorage();
      });
    } else {
      this.increaseQuantityLocalStorage(product);
    }
  }
  increaseQuantityCart(product: Product) {
    const customerId = localStorage.getItem('ownerId');
    
    console.log(product) // Adjust as per your application
    if (this.isLoggedIn()) {
      this.http.put(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items/${product.id}`, {
        quantity: product.quantity+1
      }).subscribe((response: any) => {
        product.quantity = response.quantity-1;
        this.increaseQuantityLocalStorage(product);

        // this.cartItems.next(this.cart);
        // this.saveCartToLocalStorage();
      });
    } else {
      this.increaseQuantityLocalStorage(product);
    }
  }

  increaseQuantityLocalStorage(product: Product) {
    const cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
      this.cartItems.next(this.cart);
      this.saveCartToLocalStorage();
    }
  }

  decreaseQuantity(product: Product) {
    const customerId = localStorage.getItem('ownerId'); // Adjust as per your application
    if (this.isLoggedIn()) {
      if( product.quantity==0){
        this.removeFromCart(product);
      }
      else{

      
      this.http.put(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items/${product.id}`, {
        quantity: product.quantity 
      }).subscribe((response: any) => {
        if (response.quantity > 0) {
          product.quantity = response.quantity;
        } else {
          this.removeFromCart(product);
        }
        this.decreaseQuantityLocalStorage(product);

        // this.cartItems.next(this.cart);
        // this.saveCartToLocalStorage();
      });
    }
    } else {
      this.decreaseQuantityLocalStorage(product);
    }
  }
  decreaseQuantityCart(product: Product) {
    const customerId = localStorage.getItem('ownerId'); // Adjust as per your application
    if (this.isLoggedIn()) {
      if( product.quantity==0){
        this.removeFromCart(product);
      }
      else{

      
      this.http.put(`http://ubfactoryjava-env.eba-rx3hpjez.ap-south-1.elasticbeanstalk.com/carts/${customerId}/items/${product.id}`, {
        quantity: product.quantity -1
      }).subscribe((response: any) => {
        if (response.quantity > 0) {
          product.quantity = response.quantity+1;
        } else {
          this.removeFromCart(product);
        }
        this.decreaseQuantityLocalStorage(product);

        // this.cartItems.next(this.cart);
        // this.saveCartToLocalStorage();
      });
    }
    } else {
      this.decreaseQuantityLocalStorage(product);
    }
  }

  decreaseQuantityLocalStorage(product: Product) {
    const cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartItems.next(this.cart);
      this.saveCartToLocalStorage();
    } else {
      this.removeFromCart(product);
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  getCart(): Product[] {
        return this.cart;
      }
}



// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Product } from '../../app/shared/models/product.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   private cart: Product[] = [];
//   public cartItems = new BehaviorSubject<Product[]>([]);

//   constructor() {
//     this.loadCartFromLocalStorage();
//   }
  

//   loadCartFromLocalStorage() {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       this.cart = JSON.parse(storedCart);
//       this.cartItems.next(this.cart);
//     }
//   }

//   saveCartToLocalStorage() {
//     localStorage.setItem('cart', JSON.stringify(this.cart));
//   }

//   addToCart(product: Product) {
//     const cartItem = this.cart.find(item => item.id === product.id);
//     if (cartItem) {
//       cartItem.quantity++;
//     } else {
//       this.cart.push({ ...product, quantity: 1 });
//     }
//     this.cartItems.next(this.cart);
//     this.saveCartToLocalStorage();
//   }

//   removeFromCart(product: Product) {
//     const index = this.cart.findIndex(item => item.id === product.id);
//     if (index !== -1) {
//       this.cart.splice(index, 1);
//       this.cartItems.next(this.cart);
//       this.saveCartToLocalStorage();
//     }
//   }

//   increaseQuantity(product: Product) {
//     const cartItem = this.cart.find(item => item.id === product.id);

//     if (cartItem) {
//       cartItem.quantity++;
//       this.cartItems.next(this.cart);
//       this.saveCartToLocalStorage();
//     }
//   }

//   decreaseQuantity(product: Product) {
//     const cartItem = this.cart.find(item => item.id === product.id);

//     if (cartItem && cartItem.quantity > 1) {
//       cartItem.quantity--;
//       this.cartItems.next(this.cart);
//       this.saveCartToLocalStorage();
//     }else{
//       console.log(cartItem);
//       this.removeFromCart(product);
//     }
    
//   }

//   getCart(): Product[] {
//     return this.cart;
//   }
// }
