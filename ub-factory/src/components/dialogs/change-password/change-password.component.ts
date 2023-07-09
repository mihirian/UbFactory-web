import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @Output() public closemodal = new EventEmitter();
  username:any;
  dynamicLogoUrl:any;
  submitusernameresponse:any;
  submitusernameerror:string="";
  submitotpresponse:any;
  submitnewpassresponse:any;
  view :any="newpassword";
  otpFormControl:UntypedFormControl=new UntypedFormControl;
  newusername:any;
  currentpassword:any;
  newconfirmusername:any;
  constructor(fb:UntypedFormBuilder,private _snackbar:MatSnackBar,private _loginService: LoginService,) { }
  close(){
    this.closemodal.emit();
    }
    submit(){
     
      if(this.view=="newpassword"){
        if(this.newusername!=this.newconfirmusername){
          this.submitusernameerror="Password do not match";

        }
        else{
          const customerId = localStorage.getItem('ownerId');
          var payload={
            "confirmPassword": this.newconfirmusername,
            "currentPassword": this.currentpassword,
            "id": customerId,
            "newPassword": this.newusername
          }
          this._loginService.changePassword(payload).subscribe(
            (res:any)=>{
              if(res.status=='SUCCESS'){
                  this.onLogout();
              }else{
                this._snackbar.open(res.message.toString(),'close',{ 
                  duration: 1000
              })
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
    }
    onLogout(){
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
  

  ngOnInit(): void {

  }

}
