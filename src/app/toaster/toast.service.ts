import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ToastService {

  constructor(
    public snackBar:MdSnackBar
  ) { }

  pop(message:string, action?:string) {
    if(!message)
      return;
    action = action || 'dismiss';
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
