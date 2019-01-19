import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { AuthServise } from 'src/app/core/services/auth.service';
import { Message, User } from 'src/app/core/interfaces';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/core/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit, OnDestroy {

  form: FormGroup
  user: User
  message: Message
  aSub: Subscription
  
  constructor(private matDialogRef: MatDialogRef<UserDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userServise: UserService,
              private auth: AuthServise) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  deleteUser() {
    this.form.disable()

    this.userServise.delete(this.auth.getId())
      .subscribe(
        (message: Message) => {
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
