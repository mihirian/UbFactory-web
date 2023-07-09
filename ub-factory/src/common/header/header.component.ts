import { Component } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/components/cart/cart.service';
import { ChangePasswordComponent } from 'src/components/dialogs/change-password/change-password.component';
import { ForgotPasswordComponent } from 'src/components/dialogs/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/components/dialogs/login/login.component';
import { LoginService } from 'src/components/dialogs/login/login.service';
import { RegisterComponent } from 'src/components/dialogs/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  totalCartItems: number = 0;
  isMenuOpen = false;
  isLoggedIn = false;
  isActive=false;
  drawerButtonControl = new FormControl(''); 
  constructor(private dialog: MatDialog,private cartService: CartService,private _router:Router,private _loginService:LoginService) {
    // You can replace this with your actual authentication check
    this.isLoggedIn = this.checkUserLoggedIn();
  }
  ngOnInit() { 
   
    this.updateTotalCartItems();

    this.cartService.cartItems.subscribe((cartItems: Product[]) => {
      this.updateTotalCartItems();
    });
 
  this._router.events.forEach((event) => {
    if (event instanceof NavigationEnd) {
      console.log(event['url']);

       this.drawerButtonControl= new UntypedFormControl(event['url']);
    }
  });
}
updateTotalCartItems() {
  const cartItems = this.cartService.getCart();
  this.totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
  }
  checkUserLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // return false;
    return  localStorage.getItem('loggedIn') === 'true';
  }
signOut(){
  localStorage.clear();
window.location.reload();
this._loginService.logout().subscribe(
  (res:any)=>{
 console.log(res);
 if(res.message=='SUCCESS'){
  localStorage.clear();
window.location.reload();

 }

  },
  (error)=>{

    console.log(error);
  }
)
}
openLoginDialog(): void {
  const dialogRef = this.dialog.open(LoginComponent, {
    width: '400px', // Adjust the width to your preference
    disableClose: true // Prevent closing the dialog by clicking outside or pressing Esc
  });

  // Optionally, you can subscribe to the afterClosed event to perform actions after the dialog is closed
  dialogRef.afterClosed().subscribe(result => {
    // Handle the result or perform any other actions
  });
}
openRegisterDialog(): void {
  const dialogRef = this.dialog.open(RegisterComponent, {
    width: '400px', // Adjust the width to your preference
    disableClose: true // Prevent closing the dialog by clicking outside or pressing Esc
  });

  // Optionally, you can subscribe to the afterClosed event to perform actions after the dialog is closed
  dialogRef.afterClosed().subscribe(result => {
    // Handle the result or perform any other actions
  });
}
changePassword(disableclose:any){
  let dialogRef = this.dialog.open(ChangePasswordComponent, {
    // data: { prelogindata: this.preloginresponse },
    disableClose:true
  });
  dialogRef.componentInstance.closemodal.subscribe(()=>{
    if(!disableclose){
          dialogRef.close();
    }
    else{
      alert("You need to change password for First time ");
    }
  });
 }
 forgotPassword(disableclose:any){
  let dialogRef = this.dialog.open(ForgotPasswordComponent, {
    // data: { prelogindata: this.preloginresponse },
    disableClose:true
  });
  dialogRef.componentInstance.closemodal.subscribe(()=>{
    if(!disableclose){
          dialogRef.close();
    }
    else{
      alert("You need to change password for First time ");
    }
  });
 }
 }


