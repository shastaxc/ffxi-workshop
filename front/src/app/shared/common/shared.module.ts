import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialComponentsModule } from './mat-components.module';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    exports: [
        CommonModule,
        MaterialComponentsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [],
})
export class SharedModule {}
