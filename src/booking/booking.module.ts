import { Hotel } from 'src/entities/hotel.entity';
import { Customar } from 'src/entities/customer.entity';
import { BookingSchema } from 'src/entities/booking.entity';
import { Booking } from 'src/entities/booking.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { CustomerSchema } from 'src/entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
import { HotelSchema } from 'src/entities/hotel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Customar.name, schema: CustomerSchema },
      { name: Hotel.name, schema: HotelSchema}
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, JwtService],            
  exports: [BookingService]
})
export class BookingModule { }
