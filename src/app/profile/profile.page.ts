import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public student:Student; 

  constructor(private route: ActivatedRoute, private router: Router) {
      this.route.queryParams.subscribe(params => {
        if (params && params.special) {
          this.student = JSON.parse(params.special);
          if(this.student.photo == null){
            this.student.photo = 'https://i.stack.imgur.com/l60Hf.png';
          }
        }
      });
   }

  ngOnInit() {
  }

}
