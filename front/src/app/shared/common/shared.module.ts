import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

import { PipesModule } from '../pipes/pipes.module';
import { MaterialComponentsModule } from './mat-components.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    OrderModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
