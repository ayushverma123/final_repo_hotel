import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';    
import { HydratedDocument } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

@Schema()
export class Template {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  code: Date;
  
  @Prop({ type: String,required: true })
  template: Date;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
