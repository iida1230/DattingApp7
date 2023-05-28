import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from './form-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    name1: new FormControl('', Validators.required),
    birth_on: new FormControl('2022/01/01', Validators.required),
  });

  constructor(public serv:FormServiceService) { }

  ngOnInit(): void {
    this.serv.get().subscribe(a =>console.log("FormComponentngOnInit",a))
  }

  get name(): FormControl {
    return this.profileForm.get('name') as FormControl;
  }

}
