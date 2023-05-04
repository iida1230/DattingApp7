import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(
      {
        "positionClass": "toast-bottom-right",
      }),
      NgxGalleryModule
  ],
  //exports現在のモジュールで外部に公開するコンポーネントなど ここでいう外部はAppModule
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule
  ]
})
export class SharedModule { }
