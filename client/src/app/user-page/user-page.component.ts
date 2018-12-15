import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { User } from '../core/interfaces';
import { MaterialService } from '../core/classes/material.service';
import { Observable } from 'rxjs';

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

      // function nextInput(input, event) {
      //   clearTimeout(input.keydownIdle);
      //   input.keydownIdle = setTimeout(function(field, list, index, code, length) {
      //     list = Array.prototype.slice.call(input.form.elements);
      //     index = list.indexOf(input);
      //     length = Number(input.value.length);
      //     if (length === 0 && event.keyCode === 8) {
      //       field = list[--index];
      //     } else if (length === Number(input.getAttribute('maxlength'))) {
      //       field = list[++index];
      //     }
      //     if (field) {
      //       field.focus();
      //       if ('setSelectionRange' in field) {
      //         if (field === document.activeElement) {
      //           field.setSelectionRange(0, field.value.length)
      //         }
      //       }
      //     }
      //   });
      // }
      
      // $checkout('FormWidget', {
      //   element: '.checkout-form'
      // }).on('success', function(model) {
      //   console.log('success',JSON.stringify(model.attr("order").order_data));
      // }).on('error', function(model) {
      //   var errorWrapper = document.querySelector('.error-wrapper');
      //   errorWrapper.innerHTML = model.attr('error.message');
      //   errorWrapper.classList.add('show');
      //   console.log('err',JSON.stringify(model.attr("order").order_data));
      // });
      
      



  }
}
