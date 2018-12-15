import { Component, OnInit } from '@angular/core';
import { AuthServise } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthServise) {}

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
    const potentialId = localStorage.getItem('userId')
    if (potentialId !== null) {
      this.auth.setId(potentialId)
    }
  }
}
