import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {


  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false; 

    this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_b615342c28e3aa9b0b9d384852cda85a82155197",
      consumerSecret: "cs_d75f28e39ae9f06318608cec44fc77dd75ce6427"
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  

}
