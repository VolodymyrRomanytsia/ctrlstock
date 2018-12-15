import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

import { AuthServise } from '../services/auth.service';
import { MaterialService } from '../classes/material.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  
  constructor(private matDialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private auth: AuthServise,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.auth.getId()
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.matDialogRef.close()
        this.router.navigate(['/user', this.auth.getId()])
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      } 
    )
  }
}
