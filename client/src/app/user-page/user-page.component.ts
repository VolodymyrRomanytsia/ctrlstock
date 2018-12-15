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

  // image: File
  // imagePreview = ''
  user: User

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
        (user: User) => this.user = user,
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
}
