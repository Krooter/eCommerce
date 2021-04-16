import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  gender = ['Female', 'Male', 'Other'];

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]),
      password: new FormControl('', Validators.required),
      displayName: new FormControl('', [Validators.minLength(4), Validators.required]),
      gender: new FormControl('', Validators.required),
      ageReq: new FormControl(null, Validators.required),
      terms: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    // this.accountService.register(this.registerForm.value).subscribe(() =>{
    //   this.router.navigateByUrl('account/preview');
    //   console.log("Register succesful!")
    // }, error => {
    //   console.log("Error:", error);
    // })
    console.log(this.registerForm.value);
  }
}
