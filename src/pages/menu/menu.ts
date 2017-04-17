import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

     this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_b615342c28e3aa9b0b9d384852cda85a82155197",
      consumerSecret: "cs_d75f28e39ae9f06318608cec44fc77dd75ce6427"
    });


    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for( let i = 0; i < temp.length; i ++){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);
        }
      }

    }, (err)=> {
      console.log(err)
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

}
