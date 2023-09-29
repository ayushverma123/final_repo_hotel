import { HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';
import { ConfigService} from '@nestjs/config';
import { ConfigModule} from '@nestjs/config';
import { Config } from 'prettier';
import { HotelModule } from './hotel/hotel.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';  
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { ContestModule } from './contest/contest.module';
import { TemplateService } from './template/template.service';
import { TemplateController } from './template/template.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './mail/email.controller';
import { brotliCompressSync } from 'zlib';
import { TemplateModule } from './template/template.module';
import { WebsiteModule } from './website/website.module';
  
@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    MailerModule.forRoot({
      transport:{
        host:'smtp-relay.brevo.com',
        auth:{
          user:'ayushv657@gmail.com',
          pass:'xsmtpsib-18df2502b4f86c4ee82f7e5fca97dc35dd2a512686e82287f03db4be6963c6c7-31EBpwfj5MIAnqUR'
        }
      },
      template: {
        dir: join(__dirname, './templates'),  
        adapter: new HandlebarsAdapter(),
      } 
    }),
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI, // Loaded from .ENV
      }),
    }),
    HotelModule,
    BookingModule,
    AuthModule,
    CustomerModule,
    ContestModule,
    TemplateModule, 
    WebsiteModule
  ],
  controllers: [EmailController],
  providers: [ ],
})
export class AppModule { }
