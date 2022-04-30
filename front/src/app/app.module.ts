import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/common/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OdyComposerModule } from './pages/ody-composer/ody-composer.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from './core/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    LayoutModule,
    OdyComposerModule,
    ErrorPageModule, // Must always be last for routing to work properly
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
