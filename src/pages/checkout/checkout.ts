import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {

  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }];

    this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_b615342c28e3aa9b0b9d384852cda85a82155197",
      consumerSecret: "cs_d75f28e39ae9f06318608cec44fc77dd75ce6427"
    });

    this.storage.get("userLoginInfo").then( (userLoginInfo) => {

      this.userInfo = userLoginInfo.user;

      let email = userLoginInfo.user.email;

      this.WooCommerce.getAsync("customers/email/"+email).then( (data) => {

        this.newOrder = JSON.parse(data.body).customer;

      })

    })

  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;

    if(this.billing_shipping_same)
    {
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }

  }

  

}
