import { RegisterService } from './register.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private snackBar:MatSnackBar,private _registerService:RegisterService,private fb: FormBuilder,private dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit() {
    
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }
  
  // get confirmPassControl(): AbstractControl {
  //   return this.registerForm.get('confirmPassword');
  // }

  register() {
    // Your registration logic

    var payload={
      "email":this.registerForm.value.email,
      "firstName":this.registerForm.value.firstName,
      "lastName":this.registerForm.value.lastName,
      "mobile":this.registerForm.value.mobile,
      "ownertype":"CUSTOMER",
      "password":this.registerForm.value.confirmPassword,

    };
    this._registerService.register(payload).subscribe(
      (res:any)=>{
     console.log(res);
     if(res.message=='SUCCESS'){
      this.snackBar.open(res.data.responseMessage, 'Close', { duration: 5000 });

     }
    

    //  this.slides=res;
      // if(res.result!=undefined&&res.result.status=="SUCCESS"){
      //   this.offerimagesResponse=res.result.payload.marketPlaceSearchObject;
      //   console.log("hi");
      //   this.getOfferImages();
      // } else{
       
      // }
      },
      (error: any)=>{

        console.log(error);
      }
    )
    this.dialogRef.close();

  }

  close() {
    // Close the dialog
    this.dialogRef.close();

  }
}
