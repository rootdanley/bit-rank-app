import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RecoveryService} from "../../services/recovery.service";

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})

export class RecoveryComponent {

  recovery: FormGroup;

  constructor(private fb: FormBuilder, private recoveryPasswordService: RecoveryService) {
    this.recovery = this.fb.group({
      email: ['', Validators.required]
    })
  }

  public recoveryUser() {
    const email = this.recovery.value.email;
    this.recoveryPasswordService.recoveryPassword(email);
  }
}
