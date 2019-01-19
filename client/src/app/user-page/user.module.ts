import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageComponent } from './user-page.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
    declarations: [
        UserPageComponent,
        UserEditComponent,
        UserDeleteComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        UserRoutingModule,
        CoreModule
    ],
    entryComponents: [
        UserEditComponent,
        UserDeleteComponent
    ]
})
export class UserModule { }