import { Component } from '@angular/core';
import { Student } from "../models/student";
import { AlertController, ToastController } from '@ionic/angular';
import { StudentService } from "../services/student.service";
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService:StudentService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router:Router) {
      this.studentService.getStudents().subscribe(res=>{
        this.students = res;
      })
  }

  public async removeStudent(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.studentService.removeStudent(id);            
          }
        },
      ],
    });

    await alert.present();
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Deshacer',
          handler: () => {               
            callback();
          }
        }
      ]
    });

    await toast.present();
  }
  
  public goToProfile(student:Student){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(student)
      }
    };
    this.router.navigate(['profile'], navigationExtras);
  }

  public getStudentById(id: string): void {
    this.router.navigate(['/view-student'], {
      queryParams: { id:id  },
    });
  }


  public goToNewStudent():void{
    this.router.navigate(['/new-student']);
  }
  
}
