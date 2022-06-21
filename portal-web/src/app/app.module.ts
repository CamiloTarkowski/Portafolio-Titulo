import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule } from './form/form.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ToastrModule } from 'ngx-toastr';
import { NotificationsComponent } from './notifications/notifications.component';
import { GetOrderProductsPipe } from './pipes/get-order-products.pipe';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { NgxStripeModule } from 'ngx-stripe';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavigatorComponent,
    FooterComponent,
    CatalogueComponent,
    ThousandSeparatorPipe,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    NotificationsComponent,
    GetOrderProductsPipe,
    PaymentMethodComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot(
      'pk_test_51LCowUBKpY1HISME3JwtigXTnttVp0whJchc570whrFOENdNmxb2f6Jof0PuNfBLiC09iZQUQJJ8agE30QUXZBn500CyUuhhLF'
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
