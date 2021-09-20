import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = "";
  password = "";
  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
  }


  login(val:any){
    this.service.login(val).subscribe(
      data => {
        if(data.request == "Success"){
          localStorage.setItem('token', data.token);
          this.service.setHeaders();
          alert("Log in successful!")
          this.router.navigate(['customer']);
        }
        else{
          alert("Log in attempt failed.")
        }
      },
      error => {
        alert("Wrong username or password.")
      }
);
  }
}
