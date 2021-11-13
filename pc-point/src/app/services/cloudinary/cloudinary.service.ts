import { Injectable } from '@angular/core';


const CLOUD_NAME = 'hanseberg';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor() { }

  async uploadImage(imgFile: any): Promise<any> {
    const formData = new FormData();

    formData.append('file', imgFile);
    formData.append('upload_preset', 'm30ya1mo');

    const {secure_url} = await fetch('https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json());

    console.log(secure_url);
    return secure_url.toString();
  }
}
