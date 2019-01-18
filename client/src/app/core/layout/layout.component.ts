import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../classes/material.service';
import { AuthServise } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthServise) { }

  public openModal() {
    this.dialog.open(LoginComponent, {
      height: '350px',
      width: '700px',
      position: {top: '70px'}
    })
  }


  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Ви можете увійти в систему використовуючи свій логін і пароль')
      } else if (params['accsesDenied']) {
        MaterialService.toast('Спочатку авторизуйтеся на сайті')
      } else if (params['sesionFailed']) {
        MaterialService.toast('Будь ласка, увійдіть ще раз')
      }
    })
  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }

  openUserPage() {
    this.router.navigate(['/user', this.auth.getId()])
  }
  

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate([''])
  }

}
