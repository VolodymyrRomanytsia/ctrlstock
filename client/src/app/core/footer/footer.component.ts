import { Component, OnInit } from '@angular/core';
import { AuthServise } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private auth: AuthServise,
              private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }

  openUserPage() {
    this.router.navigate(['/user', this.auth.getId()])
  }
}
