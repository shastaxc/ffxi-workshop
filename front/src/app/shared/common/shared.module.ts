import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

import { MaterialComponentsModule } from './mat-components.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    OrderModule,
  ],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    OrderModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
