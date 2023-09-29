import { ObjectId } from "mongodb";
import { IsMongoId, IsDate, IsNumber, IsNotEmpty, } from "class-validator";

export class CreateuserDto {
    
    @IsMongoId()
    @IsNotEmpty()
    quizid: ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    userid: ObjectId;
 
    @IsDate()
    @IsNotEmpty()
    startdatetime: Date;

}