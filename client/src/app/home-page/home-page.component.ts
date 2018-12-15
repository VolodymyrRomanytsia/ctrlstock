import { Component, OnInit } from '@angular/core';
import { AuthServise } from '../core/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private auth: AuthServise) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }
}
