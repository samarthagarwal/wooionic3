import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetails } from './product-details';

@NgModule({
  declarations: [
    ProductDetails,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetails),
  ],
  exports: [
    ProductDetails
  ]
})
export class ProductDetailsModule {}
