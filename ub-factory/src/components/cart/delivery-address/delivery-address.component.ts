import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISearchResult } from 'nominatim-js';
import { ProfileService } from 'src/components/profile/profile.service';
import { NominatimJS } from 'nominatim-js';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent {
  addressForm!: FormGroup;
  isEditing = false;
  customerId: any;
  customerDetails:any;
  isShippingAddressEditable: boolean = false;
  latitude: any;
  longitude: any;


  constructor(private snackBar:MatSnackBar,private fb: FormBuilder,private _profileService:ProfileService) {
    this.addressForm = this.fb.group({
    
      shippingAddress: [{ value: '', disabled: true }, Validators.required],
      shippingTown: [{ value: '', disabled: true }, Validators.required],
      shippingState: [{ value: '', disabled: true }, Validators.required],
      shippingZipCode: [{ value: '', disabled: true }, Validators.required],
    });
   }

   ngOnInit() {
    this.customerId = localStorage.getItem('ownerId');
  
      // this._profileService.getCustomerDetailsById().subscribe
      this.getCustomerDetailsById();
    }
  editAddress() {
    this.isEditing = true;
    this.toggleShippingAddressEditable();

  }
  getCustomerDetailsById() {
    this._profileService.getCustomerDetailsById(this.customerId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 'SUCCESS') {
          console.log(res.data);
          this.customerDetails = res.data;
  
          // Check if any of the address fields are empty or null.
          if (
            !res.data.streetAddress ||
            res.data.streetAddress === null ||
            !res.data.town ||
            res.data.town === null ||
            !res.data.state ||
            res.data.state === null ||
            !res.data.pinCode ||
            res.data.pinCode === null
          ) {
            // If any of the address fields are empty or null, make the address fields editable.
            // this.isShippingAddressEditable = true;
            this.toggleShippingAddressEditable();
          }
  
          this.addressForm.patchValue({
            shippingAddress: res.data.streetAddress,
            shippingTown: res.data.town,
            shippingState: res.data.state,
            shippingZipCode: res.data.pinCode,
          });
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Close', { duration: 5000 });
      },
    );
  }
  toggleShippingAddressEditable() {
    this.isShippingAddressEditable = !this.isShippingAddressEditable;
    if (this.isShippingAddressEditable) {
      this.addressForm.controls['shippingAddress'].enable();
      this.addressForm.controls['shippingTown'].enable();
      this.addressForm.controls['shippingState'].enable();
      this.addressForm.controls['shippingZipCode'].enable();
      
    } else {
      this.addressForm.controls['shippingAddress'].disable();
      this.addressForm.controls['shippingTown'].disable();
      this.addressForm.controls['shippingState'].disable();
      this.addressForm.controls['shippingZipCode'].disable();
    }
  }

  saveAddress() {
      this.isEditing = false;
      this.convertZipToLatLng(this.addressForm.value.shippingZipCode);

    
  }
  async convertZipToLatLng(zipcode: string) {
    const nominatim = new NominatimJS();

    try {
      const results:ISearchResult[] = await NominatimJS.search({ q: zipcode +', INDIA', format: 'json', limit: 1 });
    
      if (results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lng = parseFloat(results[0].lon);
      console.log(results[0]);
      this.latitude=lat;
      this.longitude=lng;
        console.log('Latitude: ' + lat);
        console.log('Longitude: ' + lng);
        let payload={
          "email":this.customerDetails.email,
          "pinCode": this.addressForm.value.shippingZipCode,
          "state": this.addressForm.value.shippingState,
          "streetAddress": this.addressForm.value.shippingAddress,
          "town":  this.addressForm.value.shippingTown,
          "lat":this.latitude,
          "lon": this.longitude
        };
        console.log(payload);
        this._profileService.updateAddress(payload).subscribe(
          (res:any)=>{
         console.log(res);
         if(res.message=='SUCCESS'){
          console.log(res.data)
          this.toggleShippingAddressEditable();
          
          // this.profileForm.patchValue({
          //   fullName: res.data.firstName+" "+res.data.lastName,
          //   email:res.data.email,
          //   mobile:res.data.mobile,
          //   shippingAddress:res.data.streetAddress,
          //   shippingTown:res.data.town,
          //   shippingState:res.data.state,
          //   shippingZipCode:res.data.pinCode
          // });
          // localStorage.setItem('loggedIn', 'true');
          // localStorage.setItem('ownerId',res.data.ownerId);
          // localStorage.setItem('ownerType',res.data.ownerType);
          // localStorage.setItem('token',res.data.token);
          // this.fetchCartFromServer();
    
         }else{
          console.log(res);
    
         }
    
          },
          (error)=>{
    
            console.log(error);
            this.snackBar.open(error.error.message, 'Close', { duration: 5000 });
    
          }
        )
      } else {
        console.log('No results found for the given ZIP code');
      }
    } catch (error) {
      console.log('An error occurred during geocoding: ' + error);
    }
  }
}
