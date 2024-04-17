import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { min } from 'rxjs';

const VALIDATORS_MESSAGES:any = {
  required:'This field is required',
  email:'Invalid email',
  minlength:'Minimum length is 6',
  notMatch : "Password doesn't match"
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges{
  
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen:boolean = true;

  errorMessages: string[] = [];

  checkValidation(){
    const errors = this.control.errors;
    if (!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => {
      return VALIDATORS_MESSAGES[key];
    });
  }
}
