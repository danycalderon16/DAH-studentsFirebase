import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[]

  private ADMIN = 10004
  private STUDENT = 10005
  constructor() { 
    this.users = [
      {
        controlNumber:'18401090',
        nip:1234,
        type:this.STUDENT
      },
      {
        controlNumber:'18401080',
        nip:1234,
        type:this.STUDENT
      },
      {
        controlNumber:'02400391',
        nip:1811,
        type:this.STUDENT
      },
      {
        controlNumber:'10203040',
        nip:9999,
        type:this.ADMIN
      },
    ]
  }

  public getUser(controlNumber:string, nip:Number):User{
    let item:User;
    item = this.users.find(user=>{
      return user.controlNumber === controlNumber && user.nip===nip;
    });
    return item;
  }
}
