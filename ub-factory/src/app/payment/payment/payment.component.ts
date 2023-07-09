import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { PaymentService } from '../payment.service';
import { RazorpayPaymentResponse } from 'src/app/shared/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/components/cart/cart.service';
import { Router } from '@angular/router';

declare var Razorpay: any;

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @Input() amount: any;

shipingcharges:any;

  constructor(private cartService: CartService,private paymentService: PaymentService, private renderer: Renderer2,
    private el: ElementRef,
    private snackBar: MatSnackBar,private router: Router,) {}
  initiatePayment() {
    var data={
      amount:this.amount,
      customerId:localStorage.getItem('ownerId'),
      ownerType:'CUSTOMER',
      paymentMode:'COD',
    }
    this.paymentService.createCOD(data).subscribe((res:any )=> {
      console.log(res);
     if(res.message=='Success'){
      this.router.navigate(['/order-history'])
     }
  
     });
    // this.paymentService.createOrder({ amount: this.amount, currency: 'INR' }).subscribe(
    //   (orderResponse:any) => {
    //     console.log(orderResponse);
    //     let options: RazorpayOptions = {
    //       // key: 'rzp_test_XVEHHxt1YOPY7q',
    //       key:'rzp_live_oulyTRwOKQzye4',
    //       amount: orderResponse.data.amount,
    //       currency: orderResponse.data.currency,
    //       name: 'Ub Factory',
    //       description: 'prateek is awesome',
    //       image: 'https://thumbs.dreamstime.com/z/look-23991907.jpg',
    //       order_id: orderResponse.data.orderId,
    //        handler: (response: RazorpayPaymentResponse) => {
    //         this.capturePayment(response);
    //       },
    //       prefill: {
    //         name: 'Mihir Verma',
    //         email: 'mihir@paymonk.com',
    //         contact: '8285272398'
    //       },
    //       theme: {
    //         color: '#3399cc'
    //       }
    //     };
    //     let rzp = new Razorpay(options);
    //     rzp.open();
    //   },
    //   (error) => {
    //     console.error('Error creating order:', error);
    //   }
    // );
  }
  getShippingCharges(){
    this.cartService.getTax().subscribe((res:any )=> {
    console.log(res);
    this.shipingcharges=res.data;
    this.amount+=this.shipingcharges;

   });
   console.log(this.shipingcharges);
   }

   ngOnInit(){
    this.getShippingCharges();
  }

  // capturePayment(response: RazorpayPaymentResponse) {
  //   this.paymentService
  //     .capturePayment({
  //       orderId: response.razorpay_order_id,
  //       paymentId: response.razorpay_payment_id,
  //       signature: response.razorpay_signature
  //     })
  //     .subscribe(
  //       (order) => {
  //         console.log('Payment successful:', order);
  //       },
  //       (error) => {
  //         console.error('Error capturing payment:', error);
  //       }
  //     );
  // }
  capturePayment(response: any) {
    console.log(response);
    this.paymentService
      .capturePayment({
        customerId:21,
        paymentId: response.razorpay_payment_id,
        amount: 1100,
        razorpayId:response.razorpay_order_id,
        signature:response.razorpay_signature
      })
      .subscribe(
        (order) => {
          console.log('Payment successful:', order);
          this.snackBar.open('Payment successful', 'Close', { duration: 5000 });
        },
        (error) => {
          console.error('Error capturing payment:', error);
          this.snackBar.open('Error capturing payment', 'Close', { duration: 5000 });
        }
      );
  }
}
