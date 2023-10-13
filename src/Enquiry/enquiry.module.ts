import { EnquirySchema } from 'src/entities/enquiry.entity'; 
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';
import { Enquiry } from 'src/entities/enquiry.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enquiry.name, schema: EnquirySchema }
   ]),
 ],
  controllers: [EnquiryController],
  providers: [EnquiryService]

})
export class CustomerModule { } 
