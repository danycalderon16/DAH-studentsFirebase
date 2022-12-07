import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUser } from '../models/authUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:User;

  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }
  // public async googleAuth():Promise<any> {
  //   return this.authLogin(new GoogleAuthProvider());
  // }
  
  public authLogin() {
    return new Promise((resolve, reject)=>{
      this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        this.user = result.user;
        resolve(this.user);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public getCurrentUser():User{
    return this.user;
  }
}
