import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username:string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

   onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password:this.password
    }

    //required field

     if(!this.validateService.validateRegister(user)){
        this.flashMessages.show('Please fill the all the fields',{ cssClass: 'alert-danger', timeout: 3000 });
       return false
     }

//validate email id
     if(!this.validateService.validateEmail(user.email)){
       this.flashMessages.show('Please fill the correct email',{ cssClass: 'alert-danger', timeout: 3000 });
       return false
     }
  }

}
