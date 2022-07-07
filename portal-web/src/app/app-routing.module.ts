import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { HomeComponent } from './home/home.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'catalogo',
    component: CatalogueComponent,
  },
  {
    path: 'historial',
    component: PaymentHistoryComponent,
  },
  {
    path: 'producto/:id',
    component: ProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pagar',
    component: PaymentMethodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'carrito',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: 'inicia-sesion',
    component: LoginComponent,
  },
  {
    path: 'notificaciones',
    component: NotificationsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
