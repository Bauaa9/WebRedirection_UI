import { LoginServicesService } from '../../services/loginServices.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  result : any;
  modelUser:User;
  constructor(private services : LoginServicesService
    ,private router:Router,private spinner: NgxSpinnerService) {
    this.modelUser = new User();
   services.preventFromBack();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show().then();
    this.services.checkData(this.modelUser).subscribe((response: any)=> {
      console.log(response['status'])
      this.spinner.hide().then();
      if(response['status']=='valid'){
        this.services.storeUser(this.modelUser);
        localStorage.setItem('isLogin',JSON.stringify(true));
        localStorage.setItem('username',JSON.stringify(this.modelUser.username));
        this.router.navigate(['/select-products']);
      }else{
        alert('Something went wrong on server')
      }
    },error => {
      localStorage.setItem('isLogin',JSON.stringify(false));
      this.spinner.hide().then();
    });
  }

}
