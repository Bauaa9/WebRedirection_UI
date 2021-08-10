import { Product } from '../../models/Product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductHandlingService } from '../../services/ProductHandling.service';
import { LoginServicesService } from '../../services/loginServices.service';
//Author: Shubham Anand
//Author of this Componenet: Shubham Anand
@Component({
  selector: 'app-CartTable',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
})
export class CartTableComponent implements OnInit {
  //private subname:Subscription;
  //list to store the objects of class product which will contain selected items with rate
  ItemsList: Product[] = [];
  sum: number = 0;
  userJson:Product[] = JSON.parse(localStorage.getItem('cart')|| '{}');

  //observable will store the list of selected items
  // observable = this.ser.ReturnList();
  constructor(
    private route: Router,
    private ser: ProductHandlingService,
    private loginService: LoginServicesService
  ) {}

  //it will sum the amount of total money of all items selected for cart
  ngOnInit() {
    // this.observable.forEach((a) => (this.sum += a.Rate));
    this.userJson.forEach((a) => (this.sum += a.Rate));
    this.ser.SaveAmount(this.sum);
  }

  calculateAmount() {
    let listProductsS: any = [];
    let preprocessedRequest: any = {};
    this.userJson.forEach((element) => {
      let tempVar = {
        name: element.Name,
        rate: element.Rate,
      };
      listProductsS.push(tempVar);
    });
    (preprocessedRequest['amountTotal'] = this.sum),
      (preprocessedRequest['cart'] = listProductsS);
    preprocessedRequest['userName'] = this.loginService.retrieveUser().username;
    console.log(preprocessedRequest);
    this.ser
      .serviceSendCartData(this.loginService.retrieveUser().username, this.sum)
      .subscribe((data: any) => {
        console.log(data);
        this.route.navigateByUrl('/payment-options', { state: data });
      });
  }
}
