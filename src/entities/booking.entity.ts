import { Customar } from './customer.entity';
import mongoose from 'mongoose';  
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';   
import { HydratedDocument } from 'mongoose';
import { Hotel } from './hotel.entity';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ type: String, required: true })
  booking_date: string;

  @Prop({ type: String, required: true })
  checkout_date: string;

  @Prop({ type: String, required: true })
  room_alloted: string;

  @Prop({ type: String, required: true })
  room_type: string;

  @Prop({ type: String })
  hotel: string;

  @Prop({ type: String, required: true })
  identity_type: string;
   
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Customar.name, 
    required: true 
  })
  cusId: ObjectId;
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Hotel.name, 
    required: true 
  })
  hote_id: ObjectId;

  @Prop({ type: String })
  customer_email: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
