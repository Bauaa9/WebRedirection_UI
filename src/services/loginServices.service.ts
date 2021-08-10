import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import {LocationStrategy} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  user:User;
constructor(private http: HttpClient, private locationStrategy: LocationStrategy) {
  this.user = new User();
}

checkData(data : User) : Observable<Object> {
  let url = "http://localhost:8081/user-auth";
  return this.http.post(url, data);
}

  storeUser(modelUser:User){
    this.user = modelUser;
  }

  retrieveUser(){
  return this.user;
  }

  preventFromBack(){
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }
}
