import { Hotel } from 'src/entities/hotel.entity';
import { HotelSchema } from 'src/entities/hotel.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema }   
    ]), 
  ],
  controllers: [HotelController],
  providers: [HotelService, JwtService],
  exports: [HotelService]
})
export class HotelModule { }  
