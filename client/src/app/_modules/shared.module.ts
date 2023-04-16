import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(
      {
        "positionClass": "toast-bottom-right",
      }),
  ],
  //exports現在のモジュールで外部に公開するコンポーネントなど ここでいう外部はAppModule
  exports:[
    BsDropdownModule,
    ToastrModule,
  ]
})
export class SharedModule { }
