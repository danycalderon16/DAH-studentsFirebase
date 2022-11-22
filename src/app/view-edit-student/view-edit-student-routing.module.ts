import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEditStudentPage } from './view-edit-student.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEditStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEditStudentPageRoutingModule {}
