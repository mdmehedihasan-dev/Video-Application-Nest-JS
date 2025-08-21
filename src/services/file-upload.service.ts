// src/file-upload.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(req: any, res: any) {
    const data = req.body;
    const imageFile = req.files.zipfile;
    console.log(imageFile);
    const dir = path.join('public', 'attachment', data.meeting_id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    imageFile.mv(path.join(dir, imageFile.name), (error) => {
      if (error) {
        console.log("couldn't upload the image file , error: ", error);
        res.status(500).send('File upload failed');
      } else {
        console.log('Image file successfully uploaded');
        res.status(200).send('File uploaded successfully');
      }
    });
  }
}