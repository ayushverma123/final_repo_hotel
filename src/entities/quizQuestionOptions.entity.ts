import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';
import { QQuestion } from './quizQuestion.entity';
  
export type OptionDocument = HydratedDocument<Option>;

@Schema()
export class Option {
  @Prop({ type: String, required: true })
  questionOptionText: string;
  
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    ref: QQuestion.name, 
    required: true 
  })
  quizid: ObjectId;

  @Prop({ type: Boolean, required: true })
  isCorrect: boolean;
}

export const OptionSchema = SchemaFactory.createForClass(Option);