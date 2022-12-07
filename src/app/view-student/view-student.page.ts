import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;
  public id: string;

  constructor(private studentService: StudentService,
    private aroute: ActivatedRoute,
    private router: Router) {
    this.student = {
      name: '',
      controlnumber: '',
      email: '',
      age: 0,
      photo: '',
      curp: '',
      career: '',
      nip: 0
    }
  }

  ngOnInit() {
    this.aroute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.studentService.getStudentById(this.id).subscribe(item => {
        this.student = item as Student;
        this.student = { id: this.id, ...this.student }
      })
    });
  }

  public editStudent() {
    this.router.navigate(['view-edit-student'], {
      queryParams: { ...this.student }
    });
  }
}
