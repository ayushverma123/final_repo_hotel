import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';       
import { HydratedDocument } from 'mongoose';
  
export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ type: String, required: true })
  hotel_name: string;

  @Prop({ type: String, required: true }) 
  country: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Number, required: true })
  pincode: number;

  @Prop({type: Number, required: true})
  room_single: number;

  @Prop({type: Number, required: true})
  room_family: number

  @Prop({type: Number, required: true})
  room_deluxe: number;

  @Prop({type: String, required: true})
  contact_person: string;

  @Prop({type: Number, required: true})
  contact_number: number;

  @Prop({type: String, required: true})
  contact_email: string;

  @Prop({ type: [String], required: false, default: [] }) // An array of strings (image URLs)
  image: string[];

  @Prop({type: String, required: true})
  category: string;

  @Prop({type: String, required: true})
  propertyType: string;

  @Prop({type: {
      lat: String,
      long: String,
    },
    required: true,
  })
    lat_lon:{
    lat: string;
    lon: string;
    }
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
