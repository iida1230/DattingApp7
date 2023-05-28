import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member:Member | undefined
  user =[{
    name:'山田太郎',
    age:32,
    address:'大阪府'
  },
  {
    name:'山田太郎1',
    age:322,
    address:'大阪府'
  }];
  constructor() { }



  ngOnInit(): void {
    let test
    test=this.user.map(item => {
      return item.age
    })
    console.log("1111111",test)
  }

}
