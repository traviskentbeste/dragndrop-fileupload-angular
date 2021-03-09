import { Directive, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDragDropFileUpload]'
})

export class DragDropFileUploadDirective {

  @HostBinding('style.background-color') private background = '#ffffff';
  @HostBinding('style.borderStyle') border: string = "dashed";
  @HostBinding('style.borderWidth') thickness: string = '1px';
  @HostBinding('style.borderRadius') radius: string = '10px';
  @HostBinding('style.padding') padding: string = '10px';
  @HostBinding('style.minHeight') height: string = '372px';
  @HostBinding('style.color') color: string = 'lightgrey';

  @Output() fileDropped = new EventEmitter<any>();

  // dragover Event
  @HostListener('dragover', ['$event']) public dragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#e2eefd';
  }

  // dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ffffff'
  }

  // drop Event
  @HostListener('drop', ['$event']) public drop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ffffff';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files)
    } 
  }
  
}