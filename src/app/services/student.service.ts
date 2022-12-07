import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];
 
  constructor(private firestore:AngularFirestore) { 

  }

  public getStudents():Observable<Student[]>{
    // return this.students;
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
            const data = a.payload.doc.data() as Student;
            const id = a.payload.doc.id;
            return {id,...data};
        });
      })
    );
  }

  public removeStudent(id: string){
    // this.students.splice(pos, 1);
    // return this.students;
    this.firestore.collection('students').doc(id).delete();
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }

  public newStudent(student: Student) {
    // this.students.push(student);
    // return this.students;
    this.firestore.collection('students').add(student)
  }

  public getStudentById(id:string){
    let student: Student;
    let result = this.firestore.collection('students').doc(id).valueChanges();
    return result;
  }

  public updateStudentById(id:string,data){
    this.firestore.collection('students').doc(id).update(data)
  }

}
