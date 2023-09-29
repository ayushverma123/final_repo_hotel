import { Option } from 'src/entities/quizQuestionOptions.entity';
import { AnswerSchema } from 'src/entities/answer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { QQuestionController } from './quizQuestion/quizQuestion.controller';
import { QQuestionService } from './quizQuestion/quizQuestion.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { OptionController } from './quizQuestionOption/options.controller';
import { OptionService } from './quizQuestionOption/options.service';
import { AnswerController } from './answer/answer.controller';
import { AnswerService } from './answer/answer.service';
import { AdminController } from './admin/admin.controller';
import { QQuestion, QquestionSchema } from 'src/entities/quizQuestion.entity';
import { User, UserSchema } from 'src/entities/user.entity';
import { Quiz, QuizSchema } from 'src/entities/quiz.entity';
import { OptionSchema } from 'src/entities/quizQuestionOptions.entity';
import { Answer } from 'src/entities/answer.entity';
import { Customar, CustomerSchema } from 'src/entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QQuestion.name, schema:QquestionSchema },
      { name: User.name, schema: UserSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: Option.name, schema: OptionSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: Customar.name, schema: CustomerSchema }
    ]),
  ],
  controllers: [
    QQuestionController,
    QuizController,
    UserController,
    OptionController, 
    AnswerController, 
    AdminController
  ],  
  providers: [
    QQuestionService,
    QuizService,
    UserService,
    OptionService, 
    AnswerService
  ],
  exports: []
})
export class ContestModule { }
