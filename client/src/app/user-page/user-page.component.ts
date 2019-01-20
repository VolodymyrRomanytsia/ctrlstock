import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/interfaces';
import { MaterialService } from '../core/classes/material.service';
import { $checkout } from 'ipsp-js-sdk/dist/checkout.min.js';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatDialog } from '@angular/material';
import { AuthServise } from '../core/services/auth.service';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User
  firstName: String
  lastName: String
  email: String
  paymentExpiration = new Date()



  constructor(public dialog: MatDialog,
              private auth: AuthServise,
              private userServise: UserService) { }

  public openEdit() {
      this.dialog.open(UserEditComponent, {
      height: '400px',
      width: '600px',
      position: {top: '70px'},
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      }
    })
  }

  public openDelete() {
    this.dialog.open(UserDeleteComponent, {
      height: '400px',
      width: '600px',
      position: {top: '70px'},
      data: {
        email: this.email
      }
    })
  }

  ngOnInit() {
    this.userServise.getById(this.auth.getId())
      .subscribe(
        (user: User) => {
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.email = user.email
          this.paymentExpiration = user.paymentExpiration
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      )
  }

pay () {

  $checkout('Api').scope(function(){
    this.request('api.checkout.form','request', { 
      "payment_system": "card",
      "token":"host-to-host generated token",
      "rectoken":"rectoken from final response",
      "cvv2":"3-digits number"
       } ).done(function(model){
        model.sendResponse();
        console.log(model.attr('order'));
    }).fail(function(model){
        console.log(model.attr('error'));
    });
});
}

}

