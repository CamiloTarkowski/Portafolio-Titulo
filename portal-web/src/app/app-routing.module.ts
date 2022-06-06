import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  {
    path:'catalogo', 
    component: CatalogoComponent
  },
  {
    path:'', 
    component: HomeComponent
  },
  {
    path:'producto/:codigo',component:ProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
