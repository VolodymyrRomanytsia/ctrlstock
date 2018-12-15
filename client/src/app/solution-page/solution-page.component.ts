import { Component, OnInit } from '@angular/core';
import { AuthServise } from '../core/services/auth.service';

@Component({
  selector: 'app-solution-page',
  templateUrl: './solution-page.component.html',
  styleUrls: ['./solution-page.component.css']
})
export class SolutionPageComponent implements OnInit {

  constructor(private auth: AuthServise) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }

  
}
