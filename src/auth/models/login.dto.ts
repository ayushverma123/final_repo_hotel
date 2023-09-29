import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';    

export class LoginDto {
  @IsEmail()
  emailid: string;
  
  @IsString()
  password: string;
}
