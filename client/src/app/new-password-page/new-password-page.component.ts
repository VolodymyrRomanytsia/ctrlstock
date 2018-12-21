import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthServise } from '../core/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../core/classes/material.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../core/interfaces';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrls: ['./new-password-page.component.css']
})
export class NewPasswordPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  userId: String

  constructor(private auth: AuthServise,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, {validators: passwordMatchValidator});

    function passwordMatchValidator (AC: AbstractControl) {
      let password = AC.get('password').value;
      let confirmPassword = AC.get('confirmPassword').value; 
       if(password != confirmPassword) {
           AC.get('confirmPassword').setErrors( {MatchPassword: true} )
       } else {
           return null
       }
      }
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          return this.auth.postReset(params['token'], this.form.value)
          }
        )
      )
      .subscribe(
        () => this.router.navigate([''], {
          queryParams: {
            registered: true
          }
        }),
        error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      } 
    )
  }

}