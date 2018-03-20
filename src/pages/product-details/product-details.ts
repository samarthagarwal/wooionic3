import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Cart } from '../cart/cart';

import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage({})
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];
  selectedOptions: any = {};
  requireOptions: boolean = true;
  productVariations: any[] = [];
  productPrice: number = 0.0;
  selectedVariation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController, private WP: WoocommerceProvider, private loadingCtrl: LoadingController) {

    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WP.init(true);

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {

      this.reviews = JSON.parse(data.body);
      console.log(this.reviews);

    }, (err) => {
      console.log(err);
    })

  }

  addToCart(product) {

    this.storage.get("cart").then((data) => {

      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      } else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {

          if (product.id == data[i].product.id) {
            let qty = data[i].qty;

            console.log("Product is already in the cart");

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }

        }

        if (added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })
        }

      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();

      })

    })

  }

  openCart(){

    this.modalCtrl.create(Cart).present();

  }

  async check(justSelectedAttribute) {

    let loading = this.loadingCtrl.create({
      content: "Getting Product Variations"
    });

    //counting selected attribute options
    let count = 0;
    for (let k in this.selectedOptions) 
      if (this.selectedOptions.hasOwnProperty(k)) 
        count++;

    let count_ = 0;
    for (var index = 0; index < this.product.attributes.length; index++) {
      
      if(this.product.attributes[index].variation)
        count_++;
      
    }

    //checking if user selected all the variation options or not

    if(count_ != count){
      this.requireOptions = true;
      return;
    } else {
      this.requireOptions = false;

      //Get product variations only once when all product variables are selected by the user
      loading.present();
      this.productVariations = JSON.parse((await this.WooCommerce.getAsync('products/' + this.product.id + '/variations/')).body);
      console.log(this.productVariations)
    }

    let i = 0, matchFailed = false;

    if (this.productVariations.length > 0) {
      for (i = 0; i < this.productVariations.length; i++) {
        matchFailed = false;
        let key: string = "";

        for (let j = 0; j < this.productVariations[i].attributes.length; j++) {
          key = this.productVariations[i].attributes[j].name;

          console.log(this.selectedOptions[key].toLowerCase()+ " " + this.productVariations[i].attributes[j].option.toLowerCase())

          if (this.selectedOptions[key].toLowerCase() == this.productVariations[i].attributes[j].option.toLowerCase()) {
            //Do nothing
          } else {
            console.log(matchFailed)
            matchFailed = true;
            break;
          }
        }

        if (matchFailed) {
          continue;
        } else {
          //found the matching variation
          //console.log(productVariations[i])
          this.productPrice = this.productVariations[i].price;
          this.selectedVariation = this.productVariations[i];
          console.log(this.selectedVariation)

          break;

        }

      }

      if(matchFailed == true){
        this.toastCtrl.create({
          message: "No Such Product Found",
          duration: 3000
        }).present().then(()=>{
          this.requireOptions = true;
        })
      }
    } else {
      this.productPrice = this.product.price;

    }

    loading.dismiss();

  }

}
