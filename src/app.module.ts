import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatGateway } from './chat/chat.gateway';
import { FileUploadService } from './services/file-upload.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway, FileUploadService],
})
export class AppModule {}
