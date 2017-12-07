import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
// import { HomePage } from '../home/home';
// import { Signup } from '../signup/signup';
// import { Login } from '../login/login';
import * as WC from 'woocommerce-api';
// import { ProductsByCategory } from '../products-by-category/products-by-category'
import { Storage } from '@ionic/storage';
import { Cart } from '../cart/cart';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, private events: Events, private WP: WoocommerceProvider) {
    this.homePage = 'HomePage';
    this.categories = [];
    this.user = {};

    this.WooCommerce = WP.init();


    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].parent == 0) {

          temp[i].subCategories = [];

          if (temp[i].slug == "clothing") {
            temp[i].icon = "shirt";
          }
          if (temp[i].slug == "music") {
            temp[i].icon = "musical-notes";
          }
          if (temp[i].slug == "posters") {
            temp[i].icon = "images";
          }

          this.categories.push(temp[i]);
        } 
      }

      //Groups Subcategories

      for (let i = 0; i < temp.length; i++){
        for (let j = 0; j < this.categories.length; j++){
          //console.log("Checking " + j + " " + i)
          if(this.categories[j].id == temp[i].parent){
            this.categories[j].subCategories.push(temp[i]);
          }
        }
      }



    }, (err) => {
      console.log(err)
    });

    this.events.subscribe("updateMenu", () => {
      this.storage.ready().then(() => {
        this.storage.get("userLoginInfo").then((userLoginInfo) => {

          if (userLoginInfo != null) {

            console.log("User logged in...");
            this.user = userLoginInfo.user;
            console.log(this.user);
            this.loggedIn = true;
          }
          else {
            console.log("No user found.");
            this.user = {};
            this.loggedIn = false;
          }

        })
      });


    })
  }

  ionViewDidEnter() {

    this.storage.ready().then(() => {
      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        if (userLoginInfo != null) {

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })


  }

  openCategoryPage(category) {

    this.childNavCtrl.setRoot('ProductsByCategory', { "category": category });

  }

  openPage(pageName: string) {
    if (pageName == "signup") {
      this.navCtrl.push('Signup');
    }
    if (pageName == "login") {
      this.navCtrl.push('Login');
    }
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(Cart);
      modal.present();
    }

  }

}
