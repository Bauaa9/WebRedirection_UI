
import { Component, OnInit } from '@angular/core';
import { ProductHandlingService } from '../../services/ProductHandling.service';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
//Author of this componenet:Shubham Anand
@Component({
  selector: 'app-SelectProduct',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {
  products: Product[] =[];
  constructor(private ser:ProductHandlingService,private router: Router,) { }

  ngOnInit() {

  }


//Method for each click on add to cart button , on each click it will create and object of product and with the
//the help of service it will store in the list of product type array of objects.
   reply_click(value:String)
  {
      //console.log(this.ser.Search(value));
      var obj = new Product(value,this.ser.Search(value));
      this.ser.store(obj);
    let tempListProducts:any=[];
      tempListProducts=JSON.parse(<string>localStorage.getItem('cart'));
    tempListProducts.forEach((elementValue:any)=>{
        this.ser.store(new Product(elementValue['Name'],elementValue['Rate']));
      });
      this.ser.update(this.ser.ReturnList());
    this.products = this.ser.ReturnList();
    console.log(this.products)
    localStorage.setItem('cart', JSON.stringify(this.products));
    const userJson = localStorage.getItem('cart');

    alert('Added product to cart');
      this.ser.show();
  }
//Method to navigate to cart page on click on the button"Proceed to buy"
  NavigateToCart(){
    this.router.navigate(['/cart']);
    //console.log(this.ser.ReturnList());

  }



}
