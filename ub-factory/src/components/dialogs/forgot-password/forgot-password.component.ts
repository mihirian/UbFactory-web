import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Output() public closemodal = new EventEmitter();
  username:any;
  submitusernameresponse:any;
  submitusernameerror:string="";
  submitotpresponse:any;
  submitnewpassresponse:any;
  view :any="submitusername";
  otpFormControl:UntypedFormControl=new UntypedFormControl;
  newusername:any;
  newconfirmusername:any;
  dynamicLogoUrl:any;
  constructor(fb:UntypedFormBuilder,private _snackbar:MatSnackBar,private _loginService: LoginService,) { }
  close(){
    this.closemodal.emit();
    }
    submit(){
      if(this.view=="submitusername"){
    this._loginService.forgotPassword({"userName":this.username}).subscribe(
        (res:any)=>{
       console.log(res);
        if(res.status=="SUCCESS"){
          this.submitusernameerror="";  
          this.submitusernameresponse=res.payload;
          this.view="submitotp";
        
        } else{
          this.submitusernameresponse=res;
          this.submitusernameerror=this.submitusernameresponse.responseMessage;
       
        }
        },
        (error:any)=>{
          console.log(error);
          this._snackbar.open(error.toString(),'close',{ 
            duration: 1000
        });
          
        }
      )
      }
      if(this.view=="submitotp"){
        this._loginService.forgotpasswordvalidate({"email":this.username,"otp":this.otpFormControl.value,"newPassword":this.newusername}).subscribe(
          (res:any)=>{
         console.log(res);
          if(res.status=="SUCCESS"){
            this.submitusernameerror="";  
            this.submitotpresponse=res;
            this.view="newpassword";
            this.submitusernameerror=this.submitotpresponse.responseMessage;
            this.closemodal.emit();

          } else{
            this.submitotpresponse=res;
            this.submitusernameerror=this.submitotpresponse.responseMessage;
         
          }
          },
          (error:any)=>{
            console.log(error);
            this._snackbar.open(error.toString(),'close',{ 
              duration: 1000
          });
            
          }
        )
      }
      
    }
  

  ngOnInit(): void {

  }

}
