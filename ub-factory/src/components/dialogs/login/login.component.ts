import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: any;
  password: any;
  loginForm: FormGroup ;
  private cart: Product[] = [];
  public cartItems = new BehaviorSubject<Product[]>([]);
  constructor( private snackBar: MatSnackBar,private http: HttpClient,private fb: FormBuilder,private dialogRef: MatDialogRef<LoginComponent>,private _loginService:LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  login(): void {
    // Perform login logic here
    // You can access the email and password fields using this.email and this.password

    this._loginService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      (res:any)=>{
     console.log(res);
     if(res.message=='SUCCESS'){
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('ownerId',res.data.ownerId);
      localStorage.setItem('ownerType',res.data.ownerType);
      localStorage.setItem('token',res.data.token);
      this.fetchCartFromServer();

     }else{
      console.log(res);

     }

      },
      (error)=>{

        console.log(error);
        this.snackBar.open(error.error.message, 'Close', { duration: 5000 });

      }
    )
    // Close the dialog after successful login
    this.dialogRef.close();
  }

  close(): void {
    // Close the dialog without performing any action
    this.dialogRef.close();
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
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.location.reload();

  }
}
