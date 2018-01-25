import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: string;
  constructor(private http: Http) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
