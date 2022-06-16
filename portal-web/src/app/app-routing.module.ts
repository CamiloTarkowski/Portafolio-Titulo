import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'catalogo', 
    component: CatalogoComponent
  },
  {
    path:'home', 
    component: HomeComponent
  },
  {
    path:'producto/:id',component:ProductoComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
