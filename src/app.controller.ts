import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FileUploadService } from './services/file-upload.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly fileUploadService:FileUploadService) {}

  @Get()
  @Render("action")
  index() {
   
  }

  @Get("meeting")
  @Render("index")
  meetingHome(){
  }

  @Post('/attachimg')
  async uploadFile(@Req() req: Request, @Res() res: Response) {
    await this.fileUploadService.uploadFile(req, res);
  }

}
