import { Injectable } from '@angular/core';
import { Student } from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];
 
  constructor() { 
    this.students = [
      {
        controlNumber: '18401090',
        name: 'Daniel Calderon',
        curp: 'CAVD991116HNTRLN04',
        age: 22,
        nip: 1234,        
        email: 'daalcalderonvi@ittepic.edu.mx',
        career:' ISC',
      },
      {
        controlNumber: '184010980',
        name: 'Antonio de Jesus Alvarado Martinez',
        curp: 'ALMA991218HNTRLN05',
        age: 22,
        nip: 1234,        
        email: 'andealvaradoma@ittepic.edu.mx',
        career:' ISC',
        photo:'https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.6435-9/157886462_3724390637651464_4859605508018058612_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHk5LDtApfO0HY2gff__KJ28NULseaNrjXw1Qux5o2uNYYuy3_na5gcEQsjZU3ZfIN3KkjeZST6lnHJwx7q66m2&_nc_ohc=ne8u-vaKSiUAX-zSbOD&_nc_ht=scontent.fgdl9-1.fna&oh=00_AfDV0TJeEywoRU9GL_doG-YoAA-woZ7LZaJECa9CyAZsww&oe=638B44E0'
      },
      {
        controlNumber: '02400391',
        name: 'Israel Arjona Vizcaino',
        curp: 'ARVI84017HTNLRNZS09',
        age: 28,
        nip: 1811,        
        email: 'iarjonavi@ittepic.edu.mx',
        career:' ISC'
      }
    ];
  }

  public getStudents():Student[]{
    return this.students;
  }

  public removeTask(pos:number){
    return this.students.splice(pos,1);
  }  
}
