import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';
import { Quiz } from './quiz.entity';
export type QQuestionDocument = HydratedDocument<QQuestion>;

@Schema()
export class QQuestion {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  questiontext: string;
    
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Quiz.name, required: true })
  quizid: ObjectId;

  @Prop({ type: String, required: true })
  correctAnswer: string;

  @Prop({ type: Date, required: true })
  createdon: Date;

  @Prop({ required: true })
  options: {
    choice: string;
  }[];
}

export const QquestionSchema = SchemaFactory.createForClass(QQuestion);
