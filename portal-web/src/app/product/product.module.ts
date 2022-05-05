import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './components/description/description.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [DescriptionComponent, ImageComponent],
  imports: [CommonModule],
})
export class ProductModule {}
