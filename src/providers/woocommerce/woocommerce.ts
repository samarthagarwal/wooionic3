import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;

  constructor() {
    this.Woocommerce = WC({
      url: "http://52.66.171.54",
      consumerKey: "ck_2ec7be12c0191a8a222cb85e89eea6291e0746e1",
      consumerSecret: "cs_a300ce55d107c61910208ae1d37f4c4978561b87"
    });

    this.WoocommerceV2 = WC({
      url: "http://52.66.171.54",
      consumerKey: "ck_2ec7be12c0191a8a222cb85e89eea6291e0746e1",
      consumerSecret: "cs_a300ce55d107c61910208ae1d37f4c4978561b87",
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
