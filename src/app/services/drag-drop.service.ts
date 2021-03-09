import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const uploadUrl = 'http://localhost:8080/upload';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  
  constructor(private http: HttpClient) { }
  
  uploadFiles(images: File): Observable<any> {
    let arr = [];
    let formData = new FormData();
    arr.push(images);

    arr[0].forEach((item, i) => {
      formData.append('files', item.file);
    })
    
    return this.http.post(uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
}
