import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  gender = ['Female', 'Male', 'Other'];
  errors: string[];
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private toast: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || 'shop';
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')], [this.asyncValidator()]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
      displayName: new FormControl('', [Validators.minLength(4), Validators.required]),
      gender: new FormControl('', Validators.required),
      ageReq: new FormControl(null, Validators.required),
      terms: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(response =>{
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log("Error:", error);
      this.errors = error.errors;
      this.toast.error(this.errors[0]);
    });
  }

  asyncValidator(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value){
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExist: true} : null;
            })
          )
        })
      );
    }
  }
}
