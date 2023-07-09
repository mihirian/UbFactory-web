import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/components/cart/cart.component';
import { HomeComponent } from 'src/components/home/home.component';
import { OrderGistoryComponent } from 'src/components/order-gistory/order-gistory.component';
import { PrivacypolicyComponent } from 'src/components/privacypolicy/privacypolicy.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { RefundcancellationsComponent } from 'src/components/refundcancellations/refundcancellations.component';
import { ShippingpolicyComponent } from 'src/components/shippingpolicy/shippingpolicy.component';
import { ShopComponent } from 'src/components/shop/shop.component';
import { TermsandconditionComponent } from 'src/components/termsandcondition/termsandcondition.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { CartStepperComponent } from 'src/components/cart/cart-stepper/cart-stepper.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent  ,
   
  },
  {
    path: 'shop', component: ShopComponent  ,

  },
  {
    path: 'cart',component:CartStepperComponent
  },
  {
    path: 'termsandconditionComponent',component:TermsandconditionComponent
  },
  {
    path:'shippingpolicyComponent',component:ShippingpolicyComponent
  },
  {
    path:'refundcancellationsComponent',component:RefundcancellationsComponent
  },
  {
    path:'privacypolicyComponent',component:PrivacypolicyComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'order-history',component:OrderGistoryComponent
  },
  { path: 'payment', component: PaymentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
