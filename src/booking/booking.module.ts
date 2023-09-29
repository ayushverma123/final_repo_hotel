import { Customar } from 'src/entities/customer.entity';
import { BookingSchema } from 'src/entities/booking.entity';
import { Booking } from 'src/entities/booking.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { CustomerSchema } from 'src/entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Customar.name, schema: CustomerSchema }
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, JwtService],
  exports: [BookingService]
})
export class BookingModule { }
