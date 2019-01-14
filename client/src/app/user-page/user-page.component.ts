import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { User } from '../core/interfaces';
import { MaterialService } from '../core/classes/material.service';
import { Observable } from 'rxjs';
import { $checkout } from 'ipsp-js-sdk/dist/checkout.min.js';

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


  constructor(private route: ActivatedRoute,
              private userServise: UserService) { }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.userServise.getById(params['id'])
          }
        )
      )
      .subscribe(
        (user: User) => {
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.email = user.email
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

