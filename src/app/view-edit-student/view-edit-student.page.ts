import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-view-edit-student',
  templateUrl: './view-edit-student.page.html',
  styleUrls: ['./view-edit-student.page.scss'],
})
export class ViewEditStudentPage implements OnInit {

  public student: Student;
  public controlNumber:'';
  public myForm: FormGroup;
  public validationMessages: Object;

  private curpRegEx ='^[A-Z]{1}[AEIOU]{1}[A-Z]{2}'+
  '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'+
  '[HM]{1}'+
  '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'+
  '[B-DF-HJ-NP-TV-Z]{3}'+
  '[0-9A-Z]{1}'+
  '[0-9]{1}$';
  private emailRegEx = '[a-z0-9]+@[a-z]+.[a-z]{2,3}+\.[a-z]{2,3}';
  private urlRegEx = "^(https?|chrome):\/\/[^\s$.?#].[^\s]*$"

  constructor(private studentService: StudentService,
    private fb: FormBuilder,
    private toast:ToastController,
    private aroute:ActivatedRoute,
    private router:Router) { 
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
    this.aroute.queryParams.subscribe((params)=>{
      this.student = params as Student;
      console.log(51,this.student); 
    })
    this.myForm = this.fb.group(
      {    
        name: [this.student.name, Validators.required],
        curp: [this.student.curp, Validators.compose([Validators.required, Validators.pattern(this.curpRegEx)])],
        age: [this.student.age, Validators.compose([Validators.required, Validators.min(17)])],
        nip: [this.student.nip, Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
        email: [this.student.email, Validators.compose([Validators.required, Validators.pattern("")])],
        career: ["", Validators.compose([Validators.required])],
        photo: [this.student.photo, Validators.compose([Validators.required, Validators.pattern("")])],
      }
    );
    

    this.validationMessages = {     
      "name": [{ type: 'required', message: 'El nombre es obligatorio' }],
      "career": [{ type: 'required', message: 'La carrera es obligatorio' }],
      "age": [
        { type: 'required', message: 'La edad es obligatoria' },
        { type: 'min', message: 'La edad minima es 17' }
      ],
      "curp": [
        { type: 'required', message: 'La CURP es obligatoria' },
        { type: 'pattern', message: 'El formato de la CURP es invalido' }
      ],
      "email": [
        { type: 'required', message: 'El email es obligatoria' },
        { type: 'pattern', message: 'El formato del EMAIL es invalido' }
      ],
      "photo": [
        { type: 'required', message: 'La foto es obligatoria' },
        { type: 'pattern', message: 'El formato de la URL es invalido' }
      ],
      "nip": [
        { type: 'required', message: 'El NIP es obligatorip' },
        { type: 'min', message: 'NIP demasiado corto' },
        { type: 'miax', message: 'NIP demasiado largo' },
      ]
    }    
  }

  public saveStudent(): void {
    let data:Student = this.myForm.value
    this.student = {id:this.student.id,controlnumber:this.student.controlnumber,...data}
    console.log(this.student);
    this.studentService.updateStudentById(this.student.id,this.student)
    this.router.navigate(['/view-student'],{queryParams:{id:this.student.id}});
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toast.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

}
