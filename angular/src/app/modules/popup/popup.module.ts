import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ApiService } from 'src/app/providers/api.service';

@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule,
    PopupRoutingModule,
    AppMaterialModule,
  ]
})
export class PopupModule {}
