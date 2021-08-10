import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import {
  Subject,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";

//Author of Service: Shubham Anand

@Injectable({
  providedIn: 'root',
})
export class ProductHandlingService {
  products: Product[] = [];
  private subjectData = new Subject<any>();
  private url2: string = 'http://localhost:8083/process-payment';
  TotalAmount: number = 0;

  //Array of objects of Product type for each item and its rate
  ProductList: Product[] = [
    {
      Name: 'Muesli kellogs',
      Rate: 315,
    },
    {
      Name: 'Dairy Milk',
      Rate: 35,
    },
    {
      Name: 'Rice',
      Rate: 110,
    },
    {
      Name: 'Soya Bean',
      Rate: 110,
    },
    {
      Name: 'Sugar',
      Rate: 40,
    },
    {
      Name: 'Chana Daal',
      Rate: 52,
    },
    {
      Name: 'Muesli',
      Rate: 315,
    },
    {
      Name: 'Hair Oil',
      Rate: 50,
    },
    {
      Name: 'Juice',
      Rate: 105,
    },
    {
      Name: 'Maggie',
      Rate: 12,
    },
    {
      Name: 'Marie Gold',
      Rate: 22,
    },
    {
      Name: 'Ashirwaad Aata',
      Rate: 135,
    },
  ];

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) {}

  //It will add to list of products on each item click for add to cart.
  store(value: Product) {
    this.products.push(value);
  }

  // This method will search the rate of each selected item from the array of objects created above
  Search(value: String): number {
    let index = this.ProductList.findIndex((pr) => pr.Name === value);
    return this.ProductList[index].Rate;
  }

  //For testing purpose of execuion of code , to show the selected items.
  show() {
    console.log(this.products);
  }
  //It will add to list of products on each item click for add to cart to subject.
  update(value: Product[]) {
    this.subjectData.next({ value });
  }

  //It will return the list of selected item, which will further used to store in observable
  ReturnList(): Product[] {
    return this.products;
  }

  serviceSendCartData(username: any, amount: any) {
    this.spinner.show().then(r=>console.log('started'));
    let url = 'http://localhost:8081/buy/' + localStorage.getItem('username') + '/' + amount;
    // let url = 'http://localhost:8081/buy';
    // let mappedJson:any={};
    // mappedJson['username'] = localStorage.getItem('username');
    // mappedJson['amount'] = amount;
    // return this.http.post(this.url2, mappedJson);
    return this.http.get(url).pipe(
      map((data: any) => {
        this.spinner.hide().then(r => console.log('stopped'));
        return data;
      }),
      catchError((err) => {
        this.spinner.hide().then(r => console.log('stopped'));
        return throwError('Something went wrong');
      }),
    );
  }

  SaveAmount(value: number) {
    this.TotalAmount = value;
  }

  ReturnAmount(): number {
    return this.TotalAmount;
  }
}
