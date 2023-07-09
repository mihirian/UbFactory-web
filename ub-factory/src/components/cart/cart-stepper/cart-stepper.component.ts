import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart-stepper',
  templateUrl: './cart-stepper.component.html',
  styleUrls: ['./cart-stepper.component.css']
})
export class CartStepperComponent {
  firstStep!: FormGroup;
  secondStep!: FormGroup;
  thirdStep!: FormGroup;
  totalAmount: number = 0;

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.initializeFormGroups();
    });
  }
  onTotalAmountChanged(amount: number) {
    this.totalAmount = amount;
  }
  initializeFormGroups() {
    this.firstStep = this._formBuilder.group({
      cart: ['']
    });

    this.secondStep = this._formBuilder.group({
      deliveryAddress: ['']
    });

    this.thirdStep = this._formBuilder.group({
      payment: ['']
    });
  }

  onSubmit() {
    // Submit the form data and handle the checkout process
  }

  nextStep() {
    
    console.log(this.stepper);
    this.stepper.next();
  }
}

