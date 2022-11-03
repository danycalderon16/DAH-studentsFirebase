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

  constructor(private studentService:StudentService,private toastController: ToastController,private alertController: AlertController,
    private router:Router) {
    this.students = studentService.getStudents();
  }

  async removeTask(pos:number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de borrar este alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            const taskRemoved = this.studentService.removeTask(pos);
            this.students = this.studentService.getStudents()
            this.presentToast('bottom','Se elimino el alumno corretamente',()=>{
              this.students.splice(pos,0,taskRemoved[0]);
              this.students = this.studentService.getStudents();
            }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
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
  
}
