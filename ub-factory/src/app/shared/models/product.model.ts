export interface Product {
  id: any;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  itemsLeft:any;
  originalPrice:any;
  itemId:any;
}
export interface OrderRequest {
  amount: number;
  currency: string;
}

export interface OrderResponse {
  data: any;
  id: number;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
}
export interface OrderHistoryResponse {
  customerId: number;
  products: Product[];
  orderStatus: string;
  paymentStatus: string;
  orderAmount: number;
  orderId: number;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface CaptureRequest {
  amount: number;
  orderId: string;
  paymentId: string;
  signature: string;
}