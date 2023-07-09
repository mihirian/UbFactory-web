import { Component } from '@angular/core';
import { OrderHistoryService } from './order-history.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderHistoryResponse } from 'src/app/shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { OrdereditemsComponent } from './ordereditems/ordereditems.component';


export interface Order {
  orderId: string;
  date: string;
  total: number;
  status: string;
}

const FAKE_ORDERS: Order[] = [
  { orderId: '12345', date: '2023-05-01', total: 100.00, status: 'pending' },
  { orderId: '67890', date: '2023-05-03', total: 250.00, status: 'shipped' },
  { orderId: '11121', date: '2023-05-05', total: 75.00, status: 'delivered' },
  { orderId: '13141', date: '2023-05-06', total: 150.00, status: 'returned'  },
];
@Component({
  selector: 'app-order-gistory',
  templateUrl: './order-gistory.component.html',
  styleUrls: ['./order-gistory.component.css']
})
export class OrderGistoryComponent {
  displayedColumns: string[] = ['orderId', 'orderAmount', 'orderStatus', 'paymentStatus', 'products'];
  orders: OrderHistoryResponse[] = [];

  constructor(private orderhistoryService: OrderHistoryService, private _snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getOrderHistory();
  }

  getOrderHistory() {
    let payload={
      customerId: localStorage.getItem('ownerId'),
      ownerType: "CUSTOMER",
    }
    this.orderhistoryService.getOrderHistory(payload).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == "SUCCESS") {
          this.orders = res.data.orderHistoryItems;
          console.log(this.orders);
        }
      },
      (error) => {
        console.log(error);
        this._snackbar.open(error.toString(), 'close', {
          duration: 1000
        });
      }
    )
  }
  openProductDetails(products: any) {
    this.dialog.open(OrdereditemsComponent, {
      data: products,
      width: '600px',
      height: '600px',
    });
  }
}
