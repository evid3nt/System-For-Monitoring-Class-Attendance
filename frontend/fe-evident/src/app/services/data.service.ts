// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
    setUserData(data: any) {
      console.log("setuserdata")
      console.log(data)
      console.log(JSON.stringify(data))
      localStorage.setItem('userData', JSON.stringify(data));
    }
  
    getUserData() {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    }
  
    clearUserData() {
      localStorage.removeItem('userData');
    }
  }