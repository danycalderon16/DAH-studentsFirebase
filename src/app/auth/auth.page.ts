import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  public onLogin(){
    this.auth.authLogin().then(res=>{
      let user = this.auth.getCurrentUser();
      this.router.navigate(['login'])
      
    }).catch(err=>{
      console.log(err);
    });
  }

}
