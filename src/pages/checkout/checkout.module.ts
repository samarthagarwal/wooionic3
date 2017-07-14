import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Checkout } from './checkout';

@NgModule({
  declarations: [
    Checkout,
  ],
  imports: [
    IonicPageModule.forChild(Checkout),
  ],
  exports: [
    Checkout
  ]
})
export class CheckoutPageModule {}