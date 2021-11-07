import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule, 
    PopupRoutingModule,
    AppMaterialModule,
  ]
})
export class PopupModule {}
