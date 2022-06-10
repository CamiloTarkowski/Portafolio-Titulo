import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormModule } from './form/form.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  obtenerNombre(nombre: string): string {
    return nombre;
  }
  
}
