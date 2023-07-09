import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from 'src/app/shared/models/product.model';
import { Observable, map } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @Output() totalAmount = new EventEmitter<number>();

  cartItems$: Observable<any[]>;
  total$: Observable<any> | undefined;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  shippingcharge:any;
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal', 'actions'];

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {
    this.cartItems$ = this.cartService.cartItems.asObservable();
    this.total$ = this.cartItems$.pipe(
      map(items => items.reduce((acc, product) => acc + product.price * product.quantity, 0))
    );
  }

  ngOnInit(): void {
    this.getShippingCharges();

    this.cartItems$.subscribe(cartItems => {
      this.dataSource.data = cartItems;
      console.log(cartItems);

    });
    this.total$?.subscribe((total:any) => {
      this.totalAmount.emit(total);
    });
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems$.subscribe(cartItems => {
      this.dataSource.data = cartItems;
      this.cdr.detectChanges();
    });
  }
    getShippingCharges(){
     this.cartService.getTax().subscribe((res:any )=> {
     console.log(res);
     this.shippingcharge=res.data;
    });
    console.log(this.shippingcharge);
    }
  increaseQuantity(product: Product) {
    // product.quantity+=1;

    this.cartService.increaseQuantityCart(product);
  }

  decreaseQuantity(product: Product) {
    // product.quantity-=1;

    this.cartService.decreaseQuantityCart(product);
  }
  calculateTax(total: number): number {
    const taxRate = 0.10; // You can set your desired tax rate here.
    return total * taxRate;
  }
}
