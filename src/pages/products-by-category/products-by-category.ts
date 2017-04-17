import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_b615342c28e3aa9b0b9d384852cda85a82155197",
      consumerSecret: "cs_d75f28e39ae9f06318608cec44fc77dd75ce6427"
    });


    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategory');
  }

  

}
