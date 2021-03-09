import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { DragDropService } from "../../services/drag-drop.service";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  files = [];
  form: FormGroup;
  progress: number = 0;
  showError: number = 0;
  hasMultipleImages: number = 0;

constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dragDropService: DragDropService
  ) {

    // reactive form
    this.form = this.fb.group({
      files: [null],
      imageNames: new FormControl('')
    });

  }

  ngOnInit() { }

  cardClick(event, file) {

    // this stops an attempt at prompting for file
    event.stopPropagation();

    if (file != null) {
      let index = -1;
      let i = 0;

      // find the index
      this.files.forEach(obj => {
        if ((file.name === obj.file.name) && (file.size === obj.file.size)) {
          index = i;
        }
        i++;
      });

      // remove at this index
      if (index >= 0) {
        this.files.splice(index, 1);
      }

      this.updateImageNames();
    }
  }

  addImage(files) {
    const fileListAsArray = Array.from(files);
    fileListAsArray.forEach((item, i) => {
      const file = (files as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      
      // don't add duplicates 
      let found = 0;
      //console.log(file);
      this.files.forEach(obj => {
        //console.log('obj : ' + obj.file.name + ' <=> ' + file[i].name);
        if ( (obj.file.name == file[i].name) && (obj.file.size == file[i].size) ) {
          found = 1;
          //console.log('found');
        }
      });
      if (! found) {
        this.files.push({
          file : item,
          url : url
        });
      } else {
        //console.log('looks like a duplicate');
      }

    });

    // Set files form control
    this.form.patchValue({
      files: this.files
    })

    this.form.get('files').updateValueAndValidity()

    this.updateImageNames()

  }

  clearAll() {
    this.progress = 0;
    this.files = [];
    this.updateImageNames();
  }

  uploadToServer() {

    this
    .dragDropService
    .uploadFiles(this.form.value.files)
    .subscribe( 
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            //console.log(`Uploaded! ${this.progress}%`);
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            //console.log('File uploaded successfully!', event.body);
            this.clearAll();
            break;
      }
    }, error => {
      //console.log('error : ', error);
      this.showError = 1;
      setTimeout(() => {
        this.showError = 0;
      }, 3000);
    });
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private updateImageNames() {

    let imageNamesString = "";

    if (this.files.length == 0) {
      this.hasMultipleImages = 0;
    } else if (this.files.length == 1) {
      this.hasMultipleImages = 0;
      imageNamesString = this.files[0].file.name;
    } else {
      this.hasMultipleImages = 1;
      imageNamesString = this.files.length + " files ready for upload...";
    }

    this.form.patchValue({
      imageNames: imageNamesString
    });

  }

}
