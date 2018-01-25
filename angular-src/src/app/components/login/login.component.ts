import { Component, OnInit } from '@angular/core';
import {HttpModule, Http} from "@angular/http";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages"
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  constructor(private http: Http,
              private authService: AuthService,
              private flashMessages: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username:this.username,
      password: this.password
    }


    this.authService.authenticateUser(user).subscribe(data=>{
      console.log('getting the auth done',data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessages.show('Successfully login ',{cssClass:'alert-success',timeout:1000});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashMessages.show('Wrong credentials please try again ',{cssClass:'alert-danger',timeout:1000});
      }
    })
    // this.authService.loginUser(user).subscribe(data=>{
    //   console.log('greeting from login page yeah..!');
    // })

  }


}
