import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialService } from 'src/app/core/classes/material.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AuthServise } from 'src/app/core/services/auth.service';
import { User, Message } from 'src/app/core/interfaces';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  form: FormGroup
  user: User
  message: Message
  aSub: Subscription
  
  
  constructor(private matDialogRef: MatDialogRef<UserEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userServise: UserService,
              private auth: AuthServise) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null,  [Validators.required]),
      lastName: new FormControl(null,  [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    })

    this.form.disable();

    this.userServise.getById(this.auth.getId()).subscribe(
      (user: User) => {
        if (user) {
          this.user = user;
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        }
        this.form.enable();
      }
    )

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.userServise.update(this.auth.getId(), this.form.value).subscribe(
      (message: Message) => {
        this.matDialogRef.close()
        MaterialService.toast(message.message)
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      } 
    )
  }

  close() {
    this.matDialogRef.close()
  }

}
