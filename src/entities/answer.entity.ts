import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';
import { Quiz } from './quiz.entity';
import { QQuestion } from './quizQuestion.entity';
  
export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer { 

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Quiz.name,
    required: true
  })
  quizid: ObjectId;
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Quiz.name,
    required: true 
  })
  quizparticipentid: ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref:QQuestion.name, 
    required: true 
  })
  quizquestionid: ObjectId;

  @Prop({ type: String, reuquired: true })
  optionChoice: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
