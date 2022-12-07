import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;
  public myForm: FormGroup;
  public validationMessages: Object;

  private curpRegEx ='^[A-Z]{1}[AEIOU]{1}[A-Z]{2}'+
  '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'+
  '[HM]{1}'+
  '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'+
  '[B-DF-HJ-NP-TV-Z]{3}'+
  '[0-9A-Z]{1}'+
  '[0-9]{1}$';
  private emailRegEx = '[a-z0-9]+@ittepic.edu.mx';
  private urlRegEx = "^(https?|chrome):\/\/[^\s$.?#].[^\s]*$"

  constructor(private studentService: StudentService,
    private fb: FormBuilder,
    private toast:ToastController,
    private router:Router) { }


  ngOnInit() {
    this.myForm = this.fb.group(
      {
        controlnumber: ["", Validators.compose([Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]+$')])],
        name: ["", Validators.required],
        curp: ["", Validators.compose([Validators.required, Validators.pattern(this.curpRegEx)])],
        age: ["", Validators.compose([Validators.required, Validators.min(17)])],
        nip: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
        email: ["", Validators.compose([Validators.required, Validators.pattern(this.emailRegEx)])],
        career: ["", Validators.compose([Validators.required])],
        photo: ["", Validators.compose([Validators.required])],
      }
    );
    

    this.validationMessages = {
      "controlnumber": [
        {
          "type": "required",
          "message": "Número de control obligatorio"
        },
        {
          "type": "minlength",
          "message": "El número de control debe ser de 8 dígitos"
        },
        {
          "type": "maxlength",
          "message": "El número de control debe ser de 8 dígitos"
        },
        {
          "type": "pattern",
          "message": "El número de control está mal ingresado"
        }
      ],
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

  public newStudent(data): void {
    this.student = data;
    this.studentService.newStudent(this.student);
    this.presentToast('bottom','Estudiante agregado');
    this.router.navigate(['/home']);
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
