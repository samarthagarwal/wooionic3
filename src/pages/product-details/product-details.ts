import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  WooCommerce :any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_b615342c28e3aa9b0b9d384852cda85a82155197",
      consumerSecret: "cs_d75f28e39ae9f06318608cec44fc77dd75ce6427"
    });

    
    this.WooCommerce.getAsync('products/'+this.product.id + '/reviews').then((data)=> {

      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    }, (err)=> {
      console.log(err);
    })

  }

  

}
