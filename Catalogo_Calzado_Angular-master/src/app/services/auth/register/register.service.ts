import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = API_URL+'register';

  constructor(private http: HttpClient) { }

  register(data: {nombres: string, apellidos: string, email: string, password: string}){
    return this.http.post(this.registerUrl, data);
  }
}
