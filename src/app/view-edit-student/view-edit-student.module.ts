import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ViewEditStudentPageRoutingModule } from './view-edit-student-routing.module';

import { ViewEditStudentPage } from './view-edit-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewEditStudentPageRoutingModule
  ],
  declarations: [ViewEditStudentPage]
})
export class ViewEditStudentPageModule {}
