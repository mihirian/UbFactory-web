import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CdkMenuModule } from '@angular/cdk/menu';
// import { NgMarqueeModule } from 'ng-marquee';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SwiperModule } from 'swiper/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxMarqueeModule } from 'ngx-marquee';
import {HeaderComponent} from 'src/common/header/header.component';
import { HomeComponent } from 'src/components/home/home.component';
import { ShopComponent } from 'src/components/shop/shop.component';
import { CarouselModule,  } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'src/common/carousel/carousel.component';
import { CartComponent } from 'src/components/cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PrivacypolicyComponent } from 'src/components/privacypolicy/privacypolicy.component';
import { RefundcancellationsComponent } from 'src/components/refundcancellations/refundcancellations.component';
import { ShippingpolicyComponent } from 'src/components/shippingpolicy/shippingpolicy.component';
import { TermsandconditionComponent } from 'src/components/termsandcondition/termsandcondition.component';
import { FooterComponent } from 'src/common/footer/footer.component';
import { LoginComponent } from 'src/components/dialogs/login/login.component';
import { RegisterComponent } from 'src/components/dialogs/register/register.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { OrderGistoryComponent } from 'src/components/order-gistory/order-gistory.component';
import { AuthInterceptor } from './shared/interceptor/httpconfig.interceptor';
import { PaymentComponent } from './payment/payment/payment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CartStepperComponent } from 'src/components/cart/cart-stepper/cart-stepper.component';
import { DeliveryAddressComponent } from 'src/components/cart/delivery-address/delivery-address.component';
import { ChangePasswordComponent } from 'src/components/dialogs/change-password/change-password.component';
import { ForgotPasswordComponent } from 'src/components/dialogs/forgot-password/forgot-password.component';
import { OrdereditemsComponent } from 'src/components/order-gistory/ordereditems/ordereditems.component';

// Add your services, guards, and any other providers here.
// import { AuthGuard } from './guards/auth.guard';
// import { LoginService } from './services/login.service';
// import { AppHttpInterceptor } from './interceptors/app-http.interceptor';

@NgModule({
  declarations: [AppComponent,
    HeaderComponent,
    HomeComponent,
    ShopComponent,
    CarouselComponent,
    CartComponent,
    PrivacypolicyComponent,
    RefundcancellationsComponent,
    ShippingpolicyComponent,
    TermsandconditionComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    OrderGistoryComponent,
    PaymentComponent,
    CartStepperComponent,
    DeliveryAddressComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    OrdereditemsComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgOtpInputModule,
    NgHttpLoaderModule.forRoot(),
    CdkMenuModule,
    NgxMarqueeModule,
    CarouselModule,
    MatStepperModule,
    // IvyCarouselModule,
    SwiperModule,
    // Ng2SearchPipeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // Add your services, guards, and any other providers here.
    // AuthGuard,
    // LoginService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
