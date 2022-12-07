import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object;

  private ADMIN = 10004
  private STUDENT = 10005

  constructor(
    private userService:UserService,
    private fb: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private fAuth:AngularFireAuth,
    private auth:AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        controlNumber: ["", Validators.compose([Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]+$')])],
        nip: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
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
      "nip": [
        { type: 'required', message: 'El NIP es obligatorip' },
        { type: 'min', message: 'NIP demasiado corto' },
        { type: 'miax', message: 'NIP demasiado largo' },
      ]
    }
  }

  public login(data):void{
    const controlNumber = data.controlNumber;
    const nip = parseInt(data.nip);
    const user = this.userService.getUser(controlNumber,nip);
    if(user){
      if(user.type === this.ADMIN){
        this.router.navigate(['home'])
      }else{
        this.router.navigate(['/view-student'],
        {
          queryParams:{controlNumber:controlNumber}
        }
        );
      }
    }else{
      this.presentToast('bottom','Número de control o NIP incorrecto');
    }
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toast.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast-red'
    });
    await toast.present();
  }
}
