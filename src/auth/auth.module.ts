import { Otp } from 'src/entities/otp.entity';
import { Customar, CustomerSchema } from 'src/entities/customer.entity';     
import { MongooseModule } from '@nestjs/mongoose';  
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';   
import { AuthService } from './services/auth.service';
import { CustomerService } from 'src/customer/customer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { OtpSchema } from 'src/entities/otp.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema},
      { name: Customar.name, schema: CustomerSchema }
    ])
  ],  
  controllers: [AuthController],
  providers: [
    AuthService,
    CustomerService,
    JwtService
  ],
})
export class AuthModule {}  
