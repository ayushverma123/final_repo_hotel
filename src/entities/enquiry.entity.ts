import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';        
import { HydratedDocument } from 'mongoose';
  
export type EnquiryDocument = HydratedDocument<Enquiry>;

@Schema()
export class Enquiry { 

  @Prop({ type: String, required: true })
  name: string;

  @Prop({type: String, required: true})
  email: string

  @Prop({type: String, required: true})
  enquiry: string;

}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);

