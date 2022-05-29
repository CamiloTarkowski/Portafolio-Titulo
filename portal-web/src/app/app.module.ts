import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule } from './form/form.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductoComponent } from './producto/producto.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, ProductoComponent, NavegadorComponent, FooterComponent, CatalogoComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
