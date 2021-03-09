import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DragDropComponent }           from './components/drag-drop/drag-drop.component';
import { DragDropFileUploadDirective } from './directives/drag-drop-file-upload.directive';
import { FormatBytesPipe }             from './pipes/format-bytes.pipe';
import { StringMaxLengthPipe }         from './pipes/string-max-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    DragDropFileUploadDirective,
    FormatBytesPipe,
    StringMaxLengthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
