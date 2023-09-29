import { AuthService } from 'src/auth/services/auth.service';
import { Otp, OtpSchema } from 'src/entities/otp.entity';
import { Hotel } from 'src/entities/hotel.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { BookingService } from 'src/booking/booking.service';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { HotelSchema } from 'src/entities/hotel.entity';
import { Booking, BookingSchema } from 'src/entities/booking.entity';
import { Customar, CustomerSchema } from 'src/entities/customer.entity';
import { WebsiteController } from './website.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Hotel.name, schema: HotelSchema },
        { name: Booking.name, schema: BookingSchema },
        { name: Customar.name,schema: CustomerSchema },
        { name: Otp.name, schema: OtpSchema }
    ]),
],
  controllers: [WebsiteController],
  providers: [
    HotelService,
    BookingService,
    CustomerService, 
    AuthService, 
    JwtService 
], 

})
export class WebsiteModule { }
