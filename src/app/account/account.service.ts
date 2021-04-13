import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private curentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(values: any){
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map.((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);
          this.curentUserSource.next(user);
        }
      })
    )
  }

  register(values: any){
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.curentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + '/account/emailexists?email=' + email);
  }
}
