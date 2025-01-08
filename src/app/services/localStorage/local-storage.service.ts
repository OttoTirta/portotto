import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  encryptKey: string = 'DahyunYeppeo'

  constructor() { }

  setItem(key: string, value: any) {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.encryptKey
    ).toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return null;
  }

  removeItem(key: string): any {
    localStorage.removeItem(key);
  }
}
