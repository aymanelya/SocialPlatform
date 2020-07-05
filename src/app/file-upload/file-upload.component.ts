import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Output() uploadEvent = new EventEmitter<Array<string>>();

  files: Array<string> = [];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor() {}

  removeFile(path) {
    const index: number = this.files.indexOf(path);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Upload',
      // authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      //allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 1024 * 1024 * 1024, //1G limit
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.files.push(response);
      }
    };
    this.uploader.onCompleteAll = () => {
      console.log('Finished:' + this.files);
      this.uploadEvent.emit(this.files);
    };
  }
}
