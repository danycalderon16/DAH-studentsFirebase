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
        contolNumber: '18401090',
        name: 'Daniel Calderon',
        curp: 'CAVD991116HNTRLN04',
        age: 22,
        nip: 1234,        
        email: 'daalcalderonvi@ittepic.edu.mx',
        career:' ISC'
      },
      {
        contolNumber: '184010980',
        name: 'Antonio de Jesus Alvarado Martinez',
        curp: 'ALMA991218HNTRLN05',
        age: 22,
        nip: 1234,        
        email: 'andealvaradoma@ittepic.edu.mx',
        career:' ISC'
      },
      {
        contolNumber: '02400391',
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

}
