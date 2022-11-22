import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student:Student;

  constructor(private studentService:StudentService, 
    private aroute:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.aroute.queryParams.subscribe((params)=>{
      this.student = this.studentService.getStudentByControlNumber(params.controlNumber)
      if(this.student.photo == null){
        this.student.photo = 'https://i.stack.imgur.com/l60Hf.png';
      }
    });
  }

  public editStudent():void{
    this.router.navigate(['/view-edit-student'],
    {
      queryParams:{controlNumber: this.student.controlNumber}
    }
    );    
  }

  public getStudentByControlNumber(cn:string):void{
   
  }

}
