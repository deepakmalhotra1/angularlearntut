import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    console.log('registering user ',user)
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
      .map(res => res.json());
  }

  loginUser(user){
    console.log('login user ',user)
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/login',user,{headers:headers})
      .map(res => res.json());
  }


  authenticateUser(user){
    console.log('auth servesd');
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
      .map(res=>res.json());
  }


  getProfile(){
    console.log('profile servesd');
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
      .map(res=>res.json());
  }


  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    // var tokenName: string = "id_token";
    // console.log('getting value of token exp ',tokenNotExpired(tokenName))
    // return tokenNotExpired('id_token');
    if(localStorage.getItem('id_token'))
    return true;
    else{
      return false;
    }
  }

}
