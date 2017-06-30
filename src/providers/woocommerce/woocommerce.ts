import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WooCommerceProvider {

  WooCommerce: any;

  constructor() {
    this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_d6c5feec9ea1c407d2f91661c5137c6e3e48ae3b",
      consumerSecret: "cs_de8e6cf03a5afd10491dfb1756415ac5a0169ae8"
    });
  }

  initialize(){
    return this.WooCommerce;
  }

}
