import { Module } from '@nestjs/common';
import { XemhangtondanhapController } from './xemhangtondanhap.controller';
import { XemhangtondanhapService } from './xemhangtondanhap.service';
import { XemhangdaxuatModule } from '../xemhangdaxuat/xemhangdaxuat.module';

@Module({
  controllers: [XemhangtondanhapController],
  providers: [XemhangtondanhapService],
  imports: [XemhangdaxuatModule]
})
export class XemhangtondanhapModule {}
