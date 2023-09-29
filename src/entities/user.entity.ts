import { Quiz } from './quiz.entity';
import { QQuestion } from './quizQuestion.entity';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';
import { Customar } from './customer.entity';
  
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User { 
  @Prop({ type: Date, required: true })
  startdatetime: Date;
  
  @Prop({ type: Date, required: true })
  enddatetime: Date;
  
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    ref: Quiz.name, 
    required: true 
  })
  quizid: ObjectId;  

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Customar.name, 
    required: true 
  })
  userid: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
