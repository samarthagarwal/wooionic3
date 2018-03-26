import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Checkout } from '../checkout/checkout';
// import { Login } from '../login/login';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, public toastController: ToastController) {
  
    this.total = 0.0;
    
    this.storage.ready().then(()=>{

      this.storage.get("cart").then( (data)=>{
        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems.length > 0){

          this.cartItems.forEach( (item, index)=> {

            if(item.variation){
              this.total = this.total + (parseFloat(item.variation.price) * item.qty);
            } else {
              this.total = this.total + (item.product.price * item.qty)
            }

          })

        } else {

          this.showEmptyCartMessage = true;

        }


      })

    })

  }

  removeFromCart(item, i){

    let price;
    
    if(item.variation){
      price = item.variation.price
    } else {
      price = item.product.price;
    }
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }


  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  checkout(){

    this.storage.get("userLoginInfo").then( (data) => {
      if(data != null){
        this.navCtrl.push('Checkout');
      } else {
        this.navCtrl.push('Login', {next: 'Checkout'})
      }
    })

  }

  changeQty(item, i, change){

    let price;
    
    if(!item.variation)
      price = item.product.price;
    else
      price = parseFloat(item.variation.price);
    
    let  qty = item.qty;

    if(change < 0 && item.qty == 1){
      return;
    }

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;

    this.cartItems[i] = item;

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.toastController.create({
        message: "Cart Updated.",
        duration: 2000,
        showCloseButton: true
      }).present();

    });

    this.total = (parseFloat(this.total.toString()) + (parseFloat(price.toString()) * change));


  }

}
