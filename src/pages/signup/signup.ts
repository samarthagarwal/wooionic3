import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage({})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {


  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, private WP: WoocommerceProvider) {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false; 

    //this.newUser.billing_address.country = "India"

    this.WooCommerce = WP.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  checkEmail(){

    let validEmail = false;

    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(this.newUser.email)){
      //email looks valid

      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then( (data) => {
        let res = (JSON.parse(data.body));

        if(res.errors){
          validEmail = true;

          this.toastCtrl.create({
            message: "Congratulations. Email is good to go.",
            duration: 3000
          }).present();

        } else {
          validEmail = false;

          this.toastCtrl.create({
            message: "Email already registered. Please check.",
            showCloseButton: true
          }).present();
        }

        console.log(validEmail);

      })



    } else {
      validEmail = false;
      this.toastCtrl.create({
        message: "Invalid Email. Please check.",
        showCloseButton: true
      }).present();
      console.log(validEmail);
    }

  }

  signup(){

      let customerData = {
        customer : {}
      }

      customerData.customer = {
        "email": this.newUser.email,
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "username": this.newUser.username,
        "password": this.newUser.password,
        "billing_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.billing_address.address_1,
          "address_2": this.newUser.billing_address.address_2,
          "city": this.newUser.billing_address.city,
          "state": this.newUser.billing_address.state,
          "postcode": this.newUser.billing_address.postcode,
          "country": this.newUser.billing_address.country,
          "email": this.newUser.email,
          "phone": this.newUser.billing_address.phone
        },
        "shipping_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.shipping_address.address_1,
          "address_2": this.newUser.shipping_address.address_2,
          "city": this.newUser.shipping_address.city,
          "state": this.newUser.shipping_address.state,
          "postcode": this.newUser.shipping_address.postcode,
          "country": this.newUser.shipping_address.country
        }
      }

      if(this.billing_shipping_same){
        this.newUser.shipping_address = this.newUser.shipping_address;
      }

      this.WooCommerce.postAsync('customers', customerData).then( (data) => {

        let response = (JSON.parse(data.body));

        if(response.customer){
          this.alertCtrl.create({
            title: "Account Created",
            message: "Your account has been created successfully! Please login to proceed.",
            buttons: [{
              text: "Login",
              handler: ()=> {
                //TODO
              }
            }]
          }).present();
        } else if(response.errors){
          this.toastCtrl.create({
            message: response.errors[0].message,
            showCloseButton: true
          }).present();
        }

      })

    }

}
