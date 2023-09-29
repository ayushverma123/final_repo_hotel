import { Customar } from 'src/entities/customer.entity';
import { CustomerSchema } from 'src/entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtService } from '@nestjs/jwt';
import { Otp, OtpSchema } from 'src/entities/otp.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customar.name, schema: CustomerSchema },
      { name: Otp.name, schema: OtpSchema }
   ]),
 ],
  controllers: [CustomerController],
  providers: [CustomerService, JwtService],
  exports: [CustomerService]
})
export class CustomerModule { }
