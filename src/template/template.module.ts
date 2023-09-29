import { TemplateSchema } from 'src/entities/template.entity';
import { Customar } from 'src/entities/customer.entity';
import { CustomerSchema } from 'src/entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Otp, OtpSchema } from 'src/entities/otp.entity';
import { Template } from 'src/entities/template.entity';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
   ]),
 ],
  controllers: [TemplateController],
  providers: [TemplateService],
})

export class TemplateModule { }
