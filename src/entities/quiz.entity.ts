import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';
  
export type QuizDocument = HydratedDocument<Quiz>;

@Schema()
export class Quiz {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Date, required: true })
  startdatetime: Date;

  @Prop({ type: Date, required: true })
  enddatetime: Date;

  @Prop({ type: Number, required: true })
  totalquestion: number;

  @Prop({ type: Date, required: true })
  createdon: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
