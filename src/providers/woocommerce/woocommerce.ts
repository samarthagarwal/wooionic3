import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;

  constructor() {
    this.Woocommerce = WC({
      url: "http://samarth.southeastasia.cloudapp.azure.com",
      consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
      consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    });

    this.WoocommerceV2 = WC({
      url: "http://samarth.southeastasia.cloudapp.azure.com",
      consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
      consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4",
      wpAPI: true,
      version: "wc/v2"
    });
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }

}
