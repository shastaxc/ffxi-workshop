import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatGridListModule,
  MatCardModule,
];

@NgModule({
  imports: [
    ...materialModules,
  ],
  exports: [
    ...materialModules,
  ],
})

export class MaterialComponentsModule { }
